import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")) // Correct this line
      : null
  );
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [devUser, setDevUser] = useState({});

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuthToken(data);
        setUser(jwtDecode(data.access)); // Correct this line
        localStorage.setItem("authTokens", JSON.stringify(data));
        router.push("/");
      } else {
        alert("Incorrect Credentials. Please try again");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const userLogout = () => {
    setAuthToken(null);
    setUser(null);
    setDevUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authTokens");
    }
    router.push("/login");
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/devuser/${user.user_id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + String(authToken.access),
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setDevUser(data);
      } else if (response.status === 401) {
        userLogout();
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const updateToken = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authToken?.refresh }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAuthToken(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        userLogout();
      }
      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      userLogout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 180000);
    return () => clearInterval(interval);
  }, [authToken]);

  useEffect(() => {
    if (loading && authToken) {
      updateToken();
    }
  }, [loading, authToken]);

  const contextData = {
    userLogin,
    user,
    authToken,
    userLogout,
    devUser,
    getUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
