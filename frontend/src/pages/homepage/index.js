import React, { useContext, useEffect } from "react";
import TicketList from "../../components/TicketList.js";
import ProjectList from "../projects/index.js";
import AuthContext from "../../context/AuthContext.js";
import Leaderboard from "../../components/Leaderboard.js";
import ProjectContext from "../../context/ProjectContext.js";

function Homepage() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { allTickets, tickets, search } = useContext(ProjectContext);

  useEffect(() => {
    getUser();
  }, []);

  if (!devUser) {
    return <p>Loading...</p>;
  }

  let userRole = devUser.UserRole;
  return (
    <div>
      <p className="Homepage--Welcome">Welcome {devUser.devUserName}</p>
      {user && (
        <p className="Homepage--Role"> You are logged in as {userRole} </p>
      )}
      <div className="Container--Homepage">
        <TicketList
          userRoles={userRole}
          thisUser={devUser}
          givenTickets={tickets}
          search={search}
        />
        <Leaderboard />
      </div>

      <ProjectList userRoles={userRole} />
    </div>
  );
}

export default Homepage;
