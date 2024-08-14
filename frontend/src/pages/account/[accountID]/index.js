import React, { useContext, useEffect } from "react";
import ProjectContext from "@/context/ProjectContext.js";
import TicketTable from "@/components/TicketTable.js";
import Header from "@/components/ui/Header.tsx";
import AuthContext from "@/context/AuthContext.js";
import TicketList from "@/components/TicketList.js";
import { useRouter } from "next/router";
import { LampContainer } from "@/components/ui/lamp";

function Account() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { tickets, handleAccountSearch, handleFetchUserTickets } =
    useContext(ProjectContext);

  let router = useRouter();
  const { accountID } = router.query;

  useEffect(() => {
    getUser(); // Fetch the user information

    if (accountID) {
      handleFetchUserTickets(accountID); // Fetch project details using projectId
      console.log("Fetched Project ID:", accountID);
    }
  }, [accountID]);

  let role = devUser.UserRole;
  console.log("Role:", role);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <LampContainer>
        <div className="flex flex-col items-center">
          <p className="text-white text-5xl font-light ">
            Welcome, {user.username}
          </p>

          <p className="text-white font-light mt-2">
            You have accumlated <strong>{devUser.MonthlyPoints}</strong> points
            this month
          </p>
          <p className="text-white font-light">
            Your total career points are <strong>{devUser.UserPoints}</strong>
          </p>
          <TicketList
            userRoles={role}
            givenTickets={tickets}
            searchFunction={handleAccountSearch}
            givenSearch={false}
          />
        </div>
      </LampContainer>
    </div>
  );
}
export default Account;
