import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectTable from "../../components/ProjectTable.js";
import { Button } from "react-bootstrap";
import Header from "@/components/ui/Header.tsx";

export default function ProjectList({ userRoles }) {
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

  return (
    <div className="">
      <ProjectTable userRole={userRoles} />
      <style jsx global>{`
        body {
          overflow: hidden;
          /* Other styles you want to apply to the body */
        }
      `}</style>
    </div>
  );
}
