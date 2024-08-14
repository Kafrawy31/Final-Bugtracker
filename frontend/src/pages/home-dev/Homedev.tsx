import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import projectContext from "@/context/ProjectContext";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import project from "../../../public/project-black.svg";
const Homedev = () => {
  let { getUser, devUser } = useContext(AuthContext);
  let { handleCurrId } = useContext(projectContext);

  useEffect(() => {
    getUser();
  }, []);

  if (!devUser) {
    return <p>Loading...</p>;
  }

  let Role = devUser.UserRole;

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let userRole = devUser.UserRole;
  return (
    <div>
      <AuroraBackground className="h-100%">
        <FontAwesomeIcon
          className="mt-[4rem] "
          icon={faBug}
          size="xl"
          style={{ color: "#000000" }}
        />
        <div className="flex flex-col items-center">
          <p className="text-3xl h-0 mb-7 mt-9 ">Welcome</p>
          <TextGenerateEffect
            words={capitalizeFirstLetter(String(devUser.devUserName))}
            className="text-3xl font-normal italic mb-0"
            duration={1}
          ></TextGenerateEffect>
          <TextGenerateEffect
            className="mb-[5rem]"
            duration={3}
            words={`You are logged in as a ${String(userRole)}.`}
          ></TextGenerateEffect>
        </div>

        <div className="flex min-w-[100vw] justify-evenly">
          <Link href="./tickets">
            <GlareCard className="flex flex-col items-center justify-center bg-gradient-to-r from-black to-indigo-900">
              <img src="./ticket.svg" />
              <p className="text-white font-thin text-2xl mt-2 ">Tickets</p>
            </GlareCard>
          </Link>
          <Link href="./project">
            <GlareCard className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 to-gray-700">
              <img src="./projects.svg" />
              <p className="text-white font-thin text-2xl mt-2 ">Projects</p>
            </GlareCard>
          </Link>
          <Link
            href={`account/${devUser.UserId}`}
            onClick={() => handleCurrId(devUser.UserId)}
          >
            <GlareCard className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 to-neutral-800">
              <img src="./account.svg" />
              <p className="text-white font-thin text-2xl mt-2 ">Account</p>
            </GlareCard>
          </Link>
          <Link href="submit-ticket">
            <GlareCard className="flex flex-col items-center justify-center bg-gradient-to-r from-neutral-700 to-black">
              <img src="./submit.svg" />
              <p className="text-white font-thin text-2xl mt-2 ">
                Report a bug
              </p>
            </GlareCard>
          </Link>
          {(Role === "Admin" || Role === "Senior") && (
            <>
              <Link href="/createproject">
                <GlareCard className="flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-black">
                  <img src="./project-black.svg" />
                  <p className="text-white font-thin text-2xl mt-2 ">
                    Start a new project
                  </p>
                </GlareCard>
              </Link>
            </>
          )}
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Homedev;
{
  /* {(Role === "Admin" || Role === "Senior") && (
          <>
            <button className="relative flex flex-col items-center mt-[2rem] px-16 py-6 bg-black text-white text-sm rounded-md font-semibold hover:bg-white/[0.8] hover:shadow-lg group">
              <Image
                src={project}
                width={22}
                height={25}
                alt="Submit Icon"
                className="absolute top-2 opacity-0 transition-opacity duration-300"
              />
              <span className=" ">Create Project</span>
            </button>
          </>
        )} */
}
