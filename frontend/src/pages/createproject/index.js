import React, { useContext, useState } from "react";
import ProjectContext from "../../context/ProjectContext.js";
import TicketTable from "../../components/TicketTable.js";
import Header from "../../components/ui/Header.tsx";
import AuthContext from "../../context/AuthContext.js";
import { useRouter } from "next/navigation";
import { SparklesCore } from "@/components/ui/sparkles.tsx";
import submit from "../../../public/submit.svg";
import back from "../../../public/back.svg";
import Image from "next/image";
import Link from "next/link";

function CreateProject() {
  let { createProject } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const router = useRouter();

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectStatusChange = (event) => {
    setProjectStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject(projectName, projectDescription, projectStatus);
    navigate("/homepage");
    window.location.reload();
  };

  // Mapping project status to readable format
  const displayProjectStatus = (status) => {
    switch (status) {
      case "IP":
        return "In Progress";
      case "CU":
        return "Coming Up";
      default:
        return "Select a status...";
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <div className="min-w-[28%] h-screen flex flex-col mt-[0.5%] items-center">
          <form
            className=" flex flex-col w-[98%] h-[91%] items-center justify-center border-2 border-blue-300 rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="formGroupExampleInput"></label>
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={handleProjectNameChange}
                className="text-center border-2 rounded-md "
              />
            </div>
            <div className="">
              <textarea
                type="text"
                className="h-[10rem] text-center w-[20rem] text-black border-2"
                placeholder="Project Description"
                value={projectDescription}
                onChange={handleProjectDescriptionChange}
              />
            </div>
            <div className="Register--Input">
              <label htmlFor="formGroupExampleInput2">Project Status</label>
              <select
                name="projectStatus"
                placeholder="status"
                value={projectStatus}
                onChange={handleProjectStatusChange}
                className=""
              >
                <option value="">Select status...</option>
                <option value="IP">In Progress</option>
                <option value="CU">Coming Up</option>
              </select>
            </div>
            <div className="CreateProject mt">
              <button
                className="relative flex flex-col items-center mt-4 mb-3 w-[8rem] py-2 bg-black text-blue-300 text-sm rounded-md font-semibold hover:bg-blue-400/[0.8] hover:text-transparent hover:shadow-lg group"
                type="submit"
              >
                <Image
                  src={submit}
                  width={22}
                  height={25}
                  alt="Submit Icon"
                  className="absolute top-2 opacity-0 transition-opacity duration-300"
                />
                <span className="mx-5 font-light">Create project</span>
              </button>
              <Link href="/">
                <button
                  className="relative flex flex-col items-center mt-4 mb-3 w-[6rem] ml-4 py-2 bg-black text-blue-300 text-sm rounded-md font-semibold hover:bg-blue-400/[0.8] hover:text-transparent hover:shadow-lg group"
                  type="submit"
                >
                  <Image
                    src={back}
                    width={22}
                    height={25}
                    alt="Submit Icon"
                    className="absolute top-2 opacity-0 transition-opacity duration-300"
                  />
                  <span className="mx-5 font-light">Go back</span>
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="h-screen flex flex-col items-center justify-center bg-black flex-grow-1 w-full">
          <div className="">
            <h1 className="text-3xl text-blue-300 lg:text-6xl mb-3 font-bold text-center relative z-20">
              {projectName || "New Project"}
            </h1>
            <p className="text-xl text-white lg:text-2xl font-light text-center relative z-20">
              {projectDescription || "Enter project description..."}
            </p>
            <p className="text-lg text-white lg:text-xl font-medium text-center relative z-20">
              {displayProjectStatus(projectStatus)}
            </p>
          </div>
          <div className="w-[80%] relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[1px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[1px] w-1/4 blur-sm" />
            <div className="absolute inset-x-80 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#ffffff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
