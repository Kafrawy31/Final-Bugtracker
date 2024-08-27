import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "@/context/ProjectContext.js";
import Header from "@/components/ui/Header.tsx";
import AuthContext from "@/context/AuthContext.js";
import { Button } from "react-bootstrap/";
import TicketList from "@/components/TicketList.js";
import Link from "next/link.js";
import { useRouter } from "next/router";
import submit from "../../../../public/submit-black.svg";
import Image from "next/image";
import { LampContainer } from "@/components/ui/lamp";
import back from "../../../../public/back.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
function Project() {
  const router = useRouter();
  const { projectid } = router.query; // Extract the projectId from the URL

  const {
    project,
    tickets,
    editProject,
    handleProjectSearch,
    handleFetchProject,
    remove,
    join,
    members,
  } = useContext(ProjectContext);

  const mapStatus = (status) => {
    switch (status) {
      case "CU":
        return "Coming Up";
      case "IP":
        return "In Progress";
      default:
        return status;
    }
  };

  const { getUser, devUser } = useContext(AuthContext);

  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  useEffect(() => {
    getUser(); // Fetch the user information

    if (projectid) {
      handleFetchProject(projectid); // Fetch project details using projectId
      console.log("Fetched Project ID:", projectid);
    }
  }, [projectid]);

  useEffect(() => {
    if (project) {
      setProjectDescription(project.ProjectDescription);
      setProjectStatus(project.ProjectStatus);
    }
  }, [project]);

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectStatusChange = (event) => {
    setProjectStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProject(projectDescription, projectStatus);
    router.push("/homepage");
    window.location.reload();
  };

  let userprojects = devUser?.UserProject || [];

  return (
    <div className="flex flex-col items-center">
      <Header />

      <LampContainer className=" min-w-full">
        <Link href="/projects">
          <button
            className="relative  flex flex-col items-center w-[6rem] py-2 bg-black text-blue-300 text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:text-transparent hover:shadow-lg group"
            type="submit"
          >
            <span className="mx-5 font-light">
              <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC" }} />
            </span>
          </button>
        </Link>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-light italic text-white">
            {project?.ProjectName} project tickets
          </p>
          <p className="text-blue-400">
            Status: {mapStatus(project?.ProjectStatus)}
          </p>

          <div>
            <TicketList
              userRoles={devUser?.UserRole}
              givenTickets={tickets}
              searchFunction={handleProjectSearch}
            />
          </div>
        </div>

        <div className="flex flex-row text-white m-0 ">
          {devUser?.UserRole === "Senior" && (
            <div className="flex flex-col items-center mr-40">
              <h6 className="text-white">Members on this project</h6>
              <table className="bg-white min-w-[30rem] ">
                <thead className="bg-blue-400">
                  <tr className="text-white border-collapse font-light">
                    <th className="id-column border-0">id</th>
                    <th className="name-column border-0">name</th>
                    <th className="role-column border-0">role</th>
                    <th className="Remove border-0">Remove</th>
                  </tr>
                </thead>
                <tbody className="text-black font-light text-center">
                  {members.map((member) => (
                    <tr key={member.UserId}>
                      <td className="font-bold">{member.UserId}</td>
                      <td>{member.devUserName}</td>
                      <td>{member.UserRole}</td>
                      <td className="font-semibold">
                        <Link
                          href=""
                          onClick={() =>
                            remove(member.UserId, project?.ProjectId)
                          }
                        >
                          remove
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {devUser?.UserRole === "Senior" && (
            <div className="">
              <form
                className="flex flex-col w-[30rem] bg-gray-200 items-center rounded-md"
                onSubmit={handleSubmit}
              >
                <p className="text-black">Edit project</p>
                <div className="bg-gradient-to-r from-transparent via-neutral-600 dark:via-neutral-700 to-transparent my-4 h-[1px] w-[80%]" />
                <p className="text-black font-light">Project Description: </p>
                <input
                  type="text"
                  className="text-black w-[20rem] rounded-md bg-white"
                  placeholder="Update project Description"
                  value={projectDescription}
                  onChange={handleProjectDescriptionChange}
                />

                <p className="text-black font-light">Project Status:</p>
                <select
                  className="text-black w-[20rem] rounded-md"
                  placeholder="status"
                  value={projectStatus}
                  onChange={handleProjectStatusChange}
                >
                  <option value="IP">In Progress</option>
                  <option value="CU">Coming up</option>
                </select>

                <button
                  type="submit"
                  className="relative flex flex-col items-center mt-2 px-8 py-2 bg-white text-black text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg group"
                >
                  <Image
                    src={submit}
                    width={22}
                    height={25}
                    alt="Submit Icon"
                    className="absolute top-2 opacity-0 transition-opacity duration-300"
                  />
                  <span>Edit project</span>
                </button>
              </form>
            </div>
          )}
        </div>
        {userprojects.indexOf(project.ProjectId) === -1 && (
          <button
            className="text-lg font-thin absolute left-[80%] bg-black px-5 py-2 rounded-md text-white "
            onClick={() => join(devUser.UserId, project?.ProjectId)}
          >
            Join project
          </button>
        )}
      </LampContainer>
    </div>
  );
}

export default Project;
