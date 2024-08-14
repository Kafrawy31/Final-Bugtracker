import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import Link from "next/link.js";
import Image from "next/image";
import search from "../../public/search.svg";
import ProjectContext from "../context/ProjectContext.js";
import { Button } from "./ui/moving-border.tsx";
import Header from "./ui/Header.tsx";
import axios from "axios";
import { Input } from "./ui/input.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ProjectTable({ userRole }) {
  let { handleFetchProject } = useContext(ProjectContext);
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [nextProject, setNextProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/project-list/?limit=4&search=${projectSearch}`
        );
        setProjectData(response.data.results);
        setNextProject(response.data.next);
        setPrevProject(response.data.previous);
      } catch (err) {}
    };

    fetchData();
  }, [projectSearch]);

  const projectNext = async (next) => {
    try {
      const response = await axios(next);
      setProjectData(response.data.results);
      setNextProject(response.data.next);
      setPrevProject(response.data.previous);
    } catch (err) {}
  };

  const projectPrev = async (prev) => {
    try {
      const response = await axios(prev);
      setProjectData(response.data.results);
      setNextProject(response.data.next);
      setPrevProject(response.data.previous);
    } catch (err) {}
  };

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

  console.log(projectData);
  return (
    <div>
      <Header />

      <div className="flex w-screen justify-center bg-black">
        <p className="text-4xl text-white font-light mt-2">Projects</p>
        <div className="search--container fixed top-40 w-[40%] flex justify-between mb-[1rem]">
          <Input
            className=" bg-[#151515] focus:outline-none focus:border-none text-gray-200 focus-visible:ring-0 w-[27rem] "
            type="text"
            onChange={(e) => setProjectSearch(e.target.value)}
            placeholder="Search for Project..."
            hoverColor="white"
          />

          <button
            onClick={() => projectPrev(prevProject)}
            variant="primary"
            size="md"
            className="text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="ml-3" /> prev
          </button>
          <button
            className="nextButton text-white pl-3"
            onClick={() => projectNext(nextProject)}
          >
            next <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="w-screen h-screen bg-black px-2 flex flex-col justify-center items-center">
        <div className="w-full mt-12 grid lg:grid-cols-4 gap-10">
          {projectData
            .filter((project) => {
              return projectSearch.toLowerCase() === ""
                ? project
                : project.ProjectName.toLowerCase() ||
                    project.ProjectDescription.toLowerCase() ||
                    project.ProjectStatus.toLowerCase();
            })
            .map((project) => {
              return (
                <Button
                  key={project.ProjectId}
                  duration={Math.floor(Math.random() * 10000 + 10000)}
                  borderRadius="1.75rem"
                  className="flex-1 text-white border-blue-400"
                >
                  <Link
                    href={`project/${project.ProjectId}`}
                    onClick={() => handleFetchProject(project.ProjectId)}
                  >
                    <div className="flex lg:flex-row flex-col w-[60rem] justify-center h-full lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                      <div className="lg:ms-5">
                        <h1 className=" text-xl md:text-2xl text-center font-bold">
                          {project.ProjectName}
                        </h1>
                        <p className="text-start text-white-100 mt-3 font-semibold">
                          {" "}
                          {project.ProjectDescription}
                        </p>
                        <p>Status: {mapStatus(project.ProjectStatus)}</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
