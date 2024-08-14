import { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ProjectContextProvider } from "@/context/ProjectContext";

import "../styles/app.css";
import "../styles/globals.css";
import "./fontawesome";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ProjectContextProvider>
        <Component {...pageProps} />
      </ProjectContextProvider>
    </AuthProvider>
  );
};

export default MyApp;
