import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../../../context/ProjectContext.js";
import axios from "axios";
import Header from "../../../components/ui/Header.tsx";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router.js";
import submit from "../../../../public/submit.svg";
import back from "../../../../public/back.svg";
import Image from "next/image";
import Link from "next/link";

function Ticket() {
  let { editTicket } = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [ticketSpread, setTicketSpread] = useState({
    TicketProject: editTicket.TicketProject,
    TicketAssignedTo: editTicket.TicketAssignedTo,
    TicketDescription: editTicket.TicketDescription,
    TicketStatus: editTicket.TicketStatus,
    TicketPriority: editTicket.TicketPriority,
    TicketPoints: editTicket.TicketPoints,
    TicketObserved: editTicket.TicketObserved,
    TicketExpected: editTicket.TicketExpected,
  });

  useEffect(() => {
    setTicketSpread({
      TicketProject: editTicket.TicketProject,
      TicketAssignedTo: editTicket.TicketAssignedTo,
      TicketDescription: editTicket.TicketDescription,
      TicketStatus: editTicket.TicketStatus,
      TicketPriority: editTicket.TicketPriority,
      TicketPoints: editTicket.TicketPoints,
      TicketObserved: editTicket.TicketObserved,
      TicketExpected: editTicket.TicketExpected,
    });
  }, [editTicket]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios("http://127.0.0.1:8000/api/project-list/");
      if (response.status === 200) {
        setProjects(response.data.results);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios("http://127.0.0.1:8000/api/user-list/");
      if (response.status === 200) {
        setUsers(response.data.results);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setTicketSpread({
      ...ticketSpread,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ticketSpread.TicketAssignedTo !== null) {
      ticketSpread.TicketStatus = "PE";
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketSpread),
    };

    const response = await fetch(
      `http://127.0.0.1:8000/api/ticket-update/${editTicket.TicketId}`,
      requestOptions
    );
    if (response.status === 200) {
      router.push("/tickets").then(() => router.reload());
    }
  };

  return (
    <div className="flex flex-col bg-black text-white h-[100rem]">
      <Header />
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-[2rem] border-2 border-white rounded-lg w-[30rem]"
        >
          <h2 className="h-[2.5rem] text-black text-xl font-thin justify-center bg-white w-[100%] text-center">
            Edit Ticket
          </h2>
          <label className="font-thin italic">Project:</label>
          <select
            name="TicketProject"
            value={ticketSpread.TicketProject}
            onChange={handleChange}
            className="text-black mb-2 w-[13rem] border-2 border-black rounded-md"
          >
            {projects.map((project) => {
              return (
                <option key={project.ProjectId} value={project.ProjectId}>
                  {project.ProjectName}
                </option>
              );
            })}
          </select>
          <label className="font-thin italic">Assigned User:</label>
          <select
            name="TicketAssignedTo"
            className="text-black w-[13rem] mb-3 border-2 border-black rounded-md"
            value={ticketSpread.TicketAssignedTo}
            onChange={handleChange}
          >
            <option value={null}>NA</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <label className="font-light">Description:</label>
          <textarea
            name="TicketDescription"
            className="Edit--Ticket--Description mb-3"
            value={ticketSpread.TicketDescription}
            onChange={handleChange}
          />
          <label className="font-light">Observed:</label>
          <textarea
            name="TicketObserved"
            className="Edit--Ticket--Description mb-3"
            value={ticketSpread.TicketObserved}
            onChange={handleChange}
          />
          <label className="font-light">Expected:</label>
          <textarea
            name="TicketExpected"
            className="Edit--Ticket--Description"
            value={ticketSpread.TicketExpected}
            onChange={handleChange}
          />
          <div className="flex justify-evenly w-[100%] mt-5">
            <label className="font-light">
              Points (1-10):
              <input
                type="number"
                className="ml-2 text-black text-center rounded-md"
                name="TicketPoints"
                value={ticketSpread.TicketPoints}
                onChange={handleChange}
                min="1"
                max="10"
              />
            </label>

            <label className="font-light">
              Priority:
              <select
                name="TicketPriority"
                value={ticketSpread.TicketPriority}
                onChange={handleChange}
                className="ml-2 text-black text-center rounded-md "
              >
                <option value="VH">Very High</option>
                <option value="H">High</option>
                <option value="M">Medium</option>
                <option value="L">Low</option>
              </select>
            </label>
          </div>
          <div className="flex justify-evenly w-[100%]">
            <button
              type="submit"
              className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-white text-black text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg group"
            >
              <Image
                src={submit}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className="mx-5 font-light">Edit</span>
            </button>
            <Link href="/tickets">
              <button className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-white text-black text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg group">
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
          </div>
        </form>
      </div>
    </div>
  );
}
export default Ticket;
