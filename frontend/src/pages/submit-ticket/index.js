import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import AuthContext from "../../context/AuthContext.js";
import { useRouter } from "next/router.js";
import { Button } from "react-bootstrap";
import Header from "@/components/ui/Header.tsx";
import submit from "../../../public/submit-black.svg";
import cancel from "../../../public/cancel.svg";
import Image from "next/image.js";
import Link from "next/link.js";

function SubmitTicket() {
  let { user, getUser, devUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    getUser();
  }, []);

  const [projects, setProjects] = useState([]);
  const [ticket, setTicket] = useState({
    TicketProject: "",
    TicketAssignedTo: null,
    TicketSubmittedBy: user.user_id,
    TicketDescription: "",
    TicketObserved: "",
    TicketExpected: "",
    TicketStatus: "OP",
    TicketPriority: "VH",
    TicketPoints: 1,
    TicketDateOpened: moment(),
    TicketCodeLocation: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios("http://127.0.0.1:8000/api/project-list/");
      if (response.status === 200) {
        setProjects(response.data.results);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    };
    fetch("http://127.0.0.1:8000/api/ticket-create/", requestOptions).then(
      (response) => console.log(response.status)
    );
    router.push("/homepage");
    window.location.reload();
  };

  const handleChange = (event) => {
    setTicket({ ...ticket, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-start align-middle text-center h-screen items-center bg-black ">
        <form
          onSubmit={handleSubmit}
          className="mt-[0.5rem] w-[40%] border-gray-400 border-2 rounded-md bg-white"
        >
          <div className="flex flex-col bg-black justify-center rounded-tr-md rounded-tl-md text-center h-[2.7rem] mb-5">
            <h2 className="text-white">Submit a New Ticket</h2>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="ml-5 font-light">Project: </p>
            <select
              className="w-[9rem] ml-2 font-light"
              name="TicketProject"
              value={ticket.TicketProject}
              onChange={handleChange}
            >
              <option>Select project</option>
              {projects.map((project) => {
                if (project.ProjectStatus === "IP") {
                  return (
                    <option key={project.ProjectId} value={project.ProjectId}>
                      {project.ProjectName}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
            </select>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <p className="font-light mt-3">Code Location:</p>
          <input
            type="text"
            name="TicketCodeLocation"
            className="Edit--Ticket--Description"
            value={ticket.TicketCodeLocation}
            onChange={handleChange}
          />
          <p className="font-light">Description</p>
          <textarea
            className="Edit--Ticket--Description"
            name="TicketDescription"
            value={ticket.TicketDescription}
            onChange={handleChange}
          />

          <p className="font-light">Observed Behavior:</p>
          <textarea
            className="Edit--Ticket--Description"
            name="TicketObserved"
            value={ticket.TicketObserved}
            onChange={handleChange}
          />
          <p className="font-light">Expected Behavior:</p>
          <textarea
            className="Edit--Ticket--Description"
            name="TicketExpected"
            value={ticket.TicketExpected}
            onChange={handleChange}
          />
          <div className="flex flex-row justify-center">
            <p className="font-light mr-2">Priority:</p>
            <select
              className="font-light"
              name="TicketPriority"
              value={ticket.TicketPriority}
              onChange={handleChange}
            >
              <option value="VH">Very High</option>
              <option value="H">High</option>
              <option value="M">Medium</option>
              <option value="L">Low</option>
            </select>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="relative flex flex-col items-center mb-5 px-8 py-2 w-[10rem] bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group"
            >
              <Image
                src={submit}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span>Submit ticket</span>
            </button>
            <Link href="/tickets">
              <button
                type="submit"
                className="relative flex flex-col items-center mb-5 px-8 py-2 ml-6 w-[10rem] bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group"
              >
                <Image
                  src={cancel}
                  width={22}
                  height={25}
                  alt="Submit Icon"
                  className="absolute top-2 opacity-0 transition-opacity duration-300"
                />
                <span>Cancel</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitTicket;
