import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdList, MdExitToApp, MdClose } from "react-icons/md";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

import { useAuth, useAuthUpdate } from "../../AuthContext";
import { setAuthorizationToken } from "../../libs/utils";
import FixedDiv from "../styled/FixedDiv";

const FadeIn = keyframes`
  0%{
    opacity: 0
  }
  100%{
    opacity: 1
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 5rem;
  right: 0.5rem;
  animation: 0.4s ${FadeIn} ease-in;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.color.backgroundLight};
  z-index: 100;
`;
const Li = styled.li`
  font-size: 1.25rem;
  vertical-align: middle;
  display: inline-block;
  color: ${(props) => props.theme.color.background};
  & > a {
    color: ${(props) => props.theme.color.background};
    text-decoration: none;
  }
  & > a svg,
  & > svg {
    position: relative;
    top: 0.2rem;
  }
`;
const AuthDiv = styled(FixedDiv)`
  top: 1.5rem;
  background-color: ${(props) => props.theme.color.backgroundLight};
  color: ${(props) => props.theme.color.background};
`;
const StyledImg = styled.img`
  width: 2.5rem;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  margin: 0;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.accent};
  color: ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
`;

function Auth() {
  const [showMenu, setShowMenu] = useState(false);
  const authUser = useAuth();
  const changeAuth = useAuthUpdate();
  const intl = useIntl();

  const logout = () => {
    changeAuth({ username: "", user_id: "", triggersList: [] });
    setAuthorizationToken(false);
    toast.success(
      intl.formatMessage({
        id: "menu.toast.completed",
        defaultMessage: "Logged out!",
      }),
      {
        position: "top-center",
        autoClose: 3000,
      }
    );
  };

  return (
    <div>
      {authUser.username !== "" ? (
        <div>
          <div
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            {showMenu ? (
              <>
                <AuthDiv>
                  <MdClose />
                </AuthDiv>
                <Nav>
                  <Ul>
                    <Li>
                      <Link to="/triggers">
                        <MdList />
                        <span>
                          {" "}
                          <FormattedMessage
                            id="menu.triggers"
                            defaultMessage="Triggers"
                          />
                        </span>
                      </Link>
                    </Li>
                    <Li onClick={() => logout()}>
                      <MdExitToApp />
                      <span>
                        {" "}
                        <FormattedMessage
                          id="menu.logout"
                          defaultMessage="Log out"
                        />
                      </span>
                    </Li>
                  </Ul>
                </Nav>
              </>
            ) : (
              <StyledImg
                src={
                  "https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128&rounded=true&name=" +
                  authUser.username
                }
              />
            )}
          </div>
        </div>
      ) : (
        <Link to="/login">
          <AuthDiv>
            <MdAccountCircle />
          </AuthDiv>
        </Link>
      )}
    </div>
  );
}
export default Auth;
