import React from "react";
import Image from "next/image";
import home from "../../../public/home.svg";
import Link from "next/link";
import tickets from "../../../public/ticket.svg";
import projects from "../../../public/projects.svg";
import dashboard from "../../../public/dashboard.svg";
import account from "../../../public/account.svg";
import signout from "../../../public/signout.svg";
import AuthContext from "../../context/AuthContext";
import ProjectContext from "../../context/ProjectContext";
import { useContext, useEffect } from "react";

const Header = () => {
  let { getUser, devUser, userLogout } = useContext(AuthContext);
  let { handleCurrId } = useContext(ProjectContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="z-10 ">
      <div className="w-screen bg-slate-950 h-[3rem] flex flex-row justify-evenly items-center text-white  ">
        <Link href="/">
          <p className="nav-home hover-float">
            <Image src={home} width={27} height={27} alt="" />
          </p>
        </Link>
        <Link href="/tickets">
          <p className="nav-tickets hover-float">
            <Image src={tickets} width={25} height={25} alt="" />
          </p>
        </Link>
        <Link href="/projects">
          <p className="nav-projects hover-float">
            <Image src={projects} width={27} height={27} alt="" />
          </p>
        </Link>
        <Link href="/dashboard">
          <p className="nav-dashboard hover-float">
            <Image src={dashboard} width={27} height={27} alt="" />
          </p>
        </Link>

        <Link
          href={`/account/${devUser.UserId}`}
          onClick={() => handleCurrId(devUser.UserId)}
        >
          <p className="nav-account hover-float">
            <Image src={account} width={27} height={27} alt="" />
          </p>
        </Link>
        <Link href="/login" onClick={userLogout}>
          <p className="nav-account hover-float">
            <Image src={signout} width={27} height={27} alt="" />
          </p>
        </Link>
      </div>
    </div>
  );
};

<style jsx>{`
  .hover-float:hover {
    transform: translateY(-10px);
    transition: transform 0.3s ease;
  }
`}</style>;
export default Header;
