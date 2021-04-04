import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdList, MdExitToApp, MdClose } from "react-icons/md";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

import { useAuth, useAuthUpdate } from "../../AuthContext";
import { setAuthorizationToken } from "../../libs/utils";
import StyledImg from "../styled/StyledImg";
import FixedDiv from "../styled/FixedDiv";
import Nav from "../styled/Nav";
import Ul from "../styled/Ul";
import Li from "../styled/Li";

const AuthDiv = styled(FixedDiv)`
  top: 1.5rem;
  background-color: ${(props) => props.theme.color.backgroundLight};
  color: ${(props) => props.theme.color.background};
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
          <AuthDiv className="auth-menu">
            <MdAccountCircle />
          </AuthDiv>
        </Link>
      )}
    </div>
  );
}
export default Auth;
