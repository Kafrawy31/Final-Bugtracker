import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../../../context/ProjectContext.js";
import AuthContext from "../../../context/AuthContext.js";
import axios from "axios";
import Header from "../../../components/ui/Header.tsx";
import { useRouter } from "next/router.js";
import submit from "../../../../public/submit.svg";
import back from "../../../../public/back-black.svg";
import check from "../../../../public/check-black.svg";
import Image from "next/image";
import Link from "next/link";
import { StarsBackground } from "../../../components/ui/stars-background";
import { ShootingStars } from "../../../components/ui/shooting-stars";

function ViewTicket() {
  useEffect(() => {
    getUser();
  }, []);

  const mapStatus = (status: string) => {
    switch (status) {
      case "CL":
        return "Closed";
      case "PE":
        return "Pending";
      case "OP":
        return "Open";
      default:
        return status;
    }
  };

  const mapPriority = (priority: string) => {
    switch (priority) {
      case "VH":
        return "Very High";
      case "H":
        return "High";
      case "M":
        return "Medium";
      case "L":
        return "Low";
      default:
        return "";
    }
  };

  let { user, getUser, devUser } = useContext(AuthContext);

  let { ticket, claimTicket, closeTicket } = useContext(ProjectContext);

  if (!ticket) {
    return <p> loading... </p>;
  }

  console.log("Ticket assigned to : ", ticket.TicketAssignedTo);
  console.log("Current user: ", devUser.devUserName);

  return (
    <div className="flex flex-col items-center relative h-screen bg-black">
      <StarsBackground className="absolute inset-0 z-0" />
      <ShootingStars className="absolute inset-0 z-0" />
      <Header />
      <div className="flex flex-col items-center w-[31%] border-gray-600 rounded-md border-2 bg-white mt-[4rem] text-center">
        <div className="w-[100%] bg-black flex flex-col items-center justify-center h-[3rem] py-8 rounded-tl-md rounded-tr-md">
          <h1 className="font-light text-white">Ticket {ticket.TicketId}</h1>
          <p className="text-white font-light">
            {mapPriority(String(ticket.TicketPriority))} Priority -{" "}
            {ticket.TicketPoints} points
          </p>
        </div>
        <div className="mt-3">
          <span className="font-semibold">
            {mapStatus(String(ticket.TicketStatus))} - assigned to{" "}
            {ticket.TicketAssignedTo}
          </span>
        </div>

        <div className="flex flex-row w-[100%] justify-center">
          <p className="font-light">Submitted by {ticket.TicketSubmittedBy}</p>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        <div className="mt-1">
          <p className="font-semibold">Steps to reproduce</p>
          <p className="font-light">{ticket.TicketDescription}</p>
        </div>

        <div className="my-3">
          <p className="font-semibold">Observed</p>
          <p className="font-light">{ticket.TicketObserved}</p>
        </div>

        <div className="mb-3">
          <p className="font-semibold">Expected</p>
          <p className="font-light">{ticket.TicketExpected}</p>
        </div>

        <div className="mb-3">
          <p className="font-semibold">Time Opened</p>
          <p className="font-light">{ticket.TicketDateOpened}</p>
        </div>

        <div className="flex flex-col w-[100%] items-center justify-center">
          <p className="font-semibold">Time Closed:</p>
          <p className="font-light">
            {ticket.TicketDateClosed ? ticket.TicketDateClosed : "N/A"}
          </p>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />

        {ticket.TicketAssignedTo === devUser.devUserName &&
        ticket.TicketStatus === "PE" ? (
          <Link href="/tickets">
            <button
              className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group"
              onClick={() =>
                closeTicket(
                  ticket.TicketId,
                  user.user_id,
                  ticket.TicketPoints,
                  devUser.UserPoints,
                  devUser.MonthlyPoints
                )
              }
            >
              <Image
                src={check}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className="mx-5 font-light">Close ticket</span>
            </button>
          </Link>
        ) : ticket.TicketStatus === "PE" ? (
          <Link href={"/tickets"}>
            <button className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group">
              <Image
                src={back}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className="mx-5 font-light">Go Back</span>
            </button>
          </Link>
        ) : ticket.TicketStatus === "CL" ? (
          <Link href="/tickets">
            <button className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group">
              <Image
                src={back}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className="mx-5 font-light">Go Back</span>
            </button>
          </Link>
        ) : ticket.TicketStatus === "OP" ? (
          <Link href="/tickets">
            <button
              className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-white text-black text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg group"
              onClick={() => claimTicket(ticket.TicketId, user.user_id)}
            >
              <Image
                src={back}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className="mx-5 font-light">Go Back</span>
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
export default ViewTicket;
