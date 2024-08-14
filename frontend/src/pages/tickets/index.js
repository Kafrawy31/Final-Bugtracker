import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TicketList from "../../components/TicketList";
import AuthContext from "../../context/AuthContext";
import ProjectContext from "../../context/ProjectContext";
import Header from "@/components/ui/Header";
import { LampContainer } from "@/components/ui/lamp";

function Tickets() {
  const { user, getUser, devUser } = useContext(AuthContext);
  const { tickets, search } = useContext(ProjectContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getUser().finally(() => setLoading(false));
  }, [getUser]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!devUser) {
    return <div>You are not logged in. Redirecting...</div>; // or redirect to login
  }

  const userRole = devUser.UserRole;

  return (
    <div className="flex flex-col">
      <Header />
      <LampContainer className="mb-[60rem] min-w-full">
        <p className="text-4xl font-light mb-6 text-white italic">
          All tickets
        </p>
        <TicketList
          userRoles={userRole}
          thisUser={devUser}
          givenTickets={tickets}
          search={search}
          button={true}
        />
      </LampContainer>
      <style jsx global>{`
        body {
          overflow-y: hidden;
          /* Other styles you want to apply to the body */
        }
      `}</style>
    </div>
  );
}

export default Tickets;
