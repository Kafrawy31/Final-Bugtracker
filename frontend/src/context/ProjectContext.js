import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});
  const [editTicket, setEditTicket] = useState({});
  const [editTicketId, setEditTicketId] = useState(null);
  const [members, setMembers] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [projectNext, setProjectNext] = useState(null);
  const [projectPrev, setProjectPrev] = useState(null);
  const [projectTickets, setProjectTickets] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState([]);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [accountSearch, setAccountSearch] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [ticketProject, setTicketProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [curr_id, setCurr_Id] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (projectId) {
      const fetchProjectDetails = async () => {
        try {
          const projectResponse = await axios.get(
            `http://localhost:8000/api/project-details/${projectId}`
          );
          setProject(projectResponse.data);
          handleFetchTickets(projectId);

          const membersResponse = await axios.get(
            `http://localhost:8000/api/project-members/${projectId}`
          );
          setMembers(membersResponse.data);
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      };

      fetchProjectDetails();
    }
  }, [projectId]);

  useEffect(() => {
    if (curr_id) {
      const fetchUserTickets = async () => {
        try {
          const response = await axios(
            `http://127.0.0.1:8000/api/assigned-tickets/${curr_id}/?limit=4&`
          );
          setTickets(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        } catch (err) {}
      };

      fetchUserTickets();
    }
  }, [curr_id]);

  useEffect(() => {
    if (curr_id) {
      const fetchTickets = async () => {
        try {
          const response = await axios(
            `http://127.0.0.1:8000/api/assigned-tickets/${curr_id}/?limit=4&q=${accountSearch}`
          );
          setTickets(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        } catch (err) {}
      };

      fetchTickets();
    }
  }, [curr_id, accountSearch]);

  useEffect(() => {
    if (projectId) {
      const fetchTickets = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/project-tickets/${projectId}/?limit=8&q=${projectSearch}`
          );
          setTickets(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        } catch (error) {
          console.error("Failed to fetch project-specific tickets", error);
        }
      };
      fetchTickets();
    }
  }, [projectId, projectSearch]);

  useEffect(() => {
    if (projectId) {
      const fetchTickets = async () => {
        try {
          const response = await axios(
            `http://127.0.0.1:8000/api/project-tickets/${projectId}/?limit=8&q=${projectSearch}`
          );
          setTickets(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        } catch (error) {
          console.error("Failed to fetch tickets", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request data:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
        }
      };
      fetchTickets();
    }
  }, [projectId, projectSearch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/ticket-list/?limit=8&search=${search}`
        );
        setTickets(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      } catch (err) {}
    };

    fetchAllTickets();
  }, [search]);

  const remove = async (id, pid) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        remove_project: pid,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/devuser-update/${id}`,
      requestOptions
    );
  };

  const join = async (id, pid) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        add_project: pid,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/devuser-update/${id}`,
      requestOptions
    );
    router.push("/homepage");
  };
  const pageNext = async () => {
    try {
      const response = await axios(next);
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrev = async () => {
    try {
      const response = await axios(prev);
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pageNextProject = async () => {
    try {
      const response = await axios(projectNext);
      setTickets(response.data.results);
      setProjectNext(response.data.next);
      setProjectPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrevProject = async () => {
    try {
      const response = await axios(projectPrev);
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  useEffect(() => {
    if (ticketId) {
      const fetchTicket = async () => {
        const response = await fetch(
          `http://localhost:8000/api/ticket-details/${ticketId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTicket(data);
        } else {
        }
      };

      fetchTicket();
    }
  }, [ticketId]);

  useEffect(() => {
    if (editTicketId) {
      const fetchTicketEdit = async () => {
        const response = await fetch(
          `http://localhost:8000/api/ticket-details-edit/${editTicketId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setEditTicket(data);
        } else {
        }
      };

      fetchTicketEdit();
    }
  }, [editTicketId]);

  const register = async (username, email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${username}`,
        email: `${email}`,
        password: `${password}`,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/api/user-create/",
      requestOptions
    );

    const data = await response.text();
    const result = JSON.parse(data);
    if (response.status === 201) {
      const devId = result.id;
      const devRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: devId,
        }),
      };

      const response2 = await fetch(
        "http://localhost:8000/api/devuser-create/",
        devRequestOptions
      );
    }
  };

  const createProject = async (
    projectName,
    projectDescription,
    projectStatus
  ) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProjectName: projectName,
        ProjectDescription: projectDescription,
        ProjectStatus: projectStatus,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/api/project-create/",
      requestOptions
    );
  };

  const editProject = async (projectDescription, projectStatus) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProjectDescription: projectDescription,
        ProjectStatus: projectStatus,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/project-update/${projectId}`,
      requestOptions
    );
  };

  const fetchMonthlyPoints = async () => {
    try {
      const response = await axios(`http://127.0.0.1:8000/api/devuser-list/`);
      setMonthlyPoints(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const closeTicket = async (ticketId, userId, Tpoints, UPoints, MUPoints) => {
    const newTotal = Tpoints + UPoints;
    const monthlyNewTotal = Tpoints + MUPoints;

    const requestOptionsTicket = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TicketStatus: "CL", TicketDateClosed: moment() }),
    };

    const requestOptionsUser = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserPoints: newTotal,
        MonthlyPoints: monthlyNewTotal,
      }),
    };

    fetch(
      `http://127.0.0.1:8000/api/ticket-update/${ticketId}`,
      requestOptionsTicket
    ).then((response) => {});

    fetch(
      `http://127.0.0.1:8000/api/devuser-update/${userId}`,
      requestOptionsUser
    ).then((response) => {
      router.push("/homepage");
      window.location.reload();
    });
  };

  const claimTicket = async (ticketId, userId) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TicketAssignedTo: userId,
        TicketStatus: "PE",
        TicketDateAssigned: moment(),
      }),
    };

    fetch(
      `http://127.0.0.1:8000/api/ticket-update/${ticketId}`,
      requestOptions
    ).then((response) => {
      navigate("/homepage");
      window.location.reload();
    });
  };

  const handleFetchTickets = async (projectId) => {
    if (!projectId) return;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/project-tickets/${projectId}/?limit=8`
      );
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleFetchProject = (id) => {
    if (id !== projectId) {
      setProjectId(id); // This triggers the above useEffect to fetch the project and tickets
    }
  };

  const handleFetchUserTickets = (id) => {
    if (id !== curr_id) {
      setCurr_Id(id);
    }
  };

  const handleFetchTicketEdit = (editTicketId) => {
    setEditTicketId(editTicketId);
  };

  const handleFetchTicket = (TicketId) => {
    setTicketId(TicketId);
  };

  const handleCurrId = (curr_id) => {
    setCurr_Id(curr_id);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handleProjectSearch = (projectSearch) => {
    setProjectSearch(projectSearch);
  };

  const handleAccountSearch = (accountSearch) => {
    setAccountSearch(accountSearch);
  };

  const projectContextData = {
    handleFetchProject,
    handleFetchTicket,
    project,
    handleFetchTickets,
    tickets,
    handleFetchTicketEdit,
    handleFetchUserTickets,
    editTicket,
    ticket,
    allTickets,
    pageNext,
    pagePrev,
    next,
    prev,
    search,
    handleSearch,
    claimTicket,
    handleCurrId,
    userTickets,
    closeTicket,
    register,
    createProject,
    editProject,
    handleProjectSearch,
    handleAccountSearch,
    pagePrevProject,
    pageNextProject,
    remove,
    fetchMonthlyPoints,
    monthlyPoints,
    members,
    join,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
