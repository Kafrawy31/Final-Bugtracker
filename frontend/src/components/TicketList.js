import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";
import ProjectContext from "../context/ProjectContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import submit from "../../public/submit.svg";
import search from "../../public/search.svg";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";

export default function TicketList({
  userRoles,
  thisUser,
  givenTickets,
  nextPage,
  prevPage,
  button,
  givenSearch = false,
  searchFunction,
}) {
  const { handleSearch, pageNext, pagePrev, next, prev } =
    useContext(ProjectContext);

  // Default searchFunction to handleSearch if not provided
  const searchHandler = searchFunction || handleSearch;

  if (!nextPage) {
    nextPage = next;
  }

  if (!prevPage) {
    prevPage = prev;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="Container--TicketList">
        {!givenSearch && (
          <div className="search--container w-[40%] flex justify-evenly mb-[1rem] ">
            <span>
              <Image src={search} alt="Search" className="search-img" />
            </span>
            <Input
              type="text"
              onChange={(e) => searchHandler(e.target.value)}
              placeholder="Search for tickets..."
              name="Search for tickets..."
              className=" bg-[#151515] focus:outline-none focus:border-none text-gray-200 focus-visible:ring-0 w-[20rem]"
              hoverColor="white"
            />
            <button
              className=" font-light text-white"
              onClick={() => pagePrev(prevPage)}
              s
              variant="secondary"
              size="md"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> prev
            </button>
            <Button
              className="font-light text-white"
              onClick={() => pageNext(nextPage)}
              variant="secondary"
              size="md"
            >
              next <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        )}

        {givenTickets.length === 0 ? (
          <p>No tickets to display</p>
        ) : (
          <TicketTable
            userRole={userRoles}
            tickets={givenTickets}
            Loading={false}
            user={thisUser}
            className="w-auto"
          />
        )}
        {button && (
          <Link href="/submit-ticket">
            <button className="relative flex flex-col items-center mt-2 px-8 py-2 bg-white text-black text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg group">
              <Image
                src={submit}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span>Submit a ticket</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
