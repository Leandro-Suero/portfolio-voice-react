import React from "react";
import { useAuth, useAuthUpdate } from "../../AuthContext";
import { MdAccountCircle, MdList, MdSync, MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import setAuthorizationToken from "../../libs/utils";

function Auth({ showTriggerList }) {
  const authUser = useAuth();
  const changeAuth = useAuthUpdate();

  const logout = () => {
    changeAuth({ username: "", user_id: "", triggersList: [] });
    setAuthorizationToken(false);
    console.log("logout");
  };
  const sync = () => {
    console.log("sync");
  };

  return (
    <div>
      {authUser.username !== "" ? (
        <div>
          <img
            src={
              "https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128&rounded=true&name=" +
              authUser.username
            }
            style={{
              width: "3rem",
              position: "fixed",
              top: "1rem",
              right: "1rem",
            }}
          />
          <nav className="authNav">
            <ul>
              <li>
                <Link to="/triggers">
                  <MdList /> <span>Triggers</span>
                </Link>
              </li>
              <li onClick={() => sync()}>
                <MdSync /> <span>Sync</span>{" "}
              </li>
              <li onClick={() => logout()}>
                <MdExitToApp /> <span>Log out</span>{" "}
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <Link to="/login">
          <MdAccountCircle
            style={{
              fontSize: "3rem",
              position: "fixed",
              top: "1rem",
              right: "1rem",
            }}
          />
        </Link>
      )}
    </div>
  );
}
export default Auth;
