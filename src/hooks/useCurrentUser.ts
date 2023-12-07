"use client";
import { useContext } from "react";
import SessionContext from "@/context/Session/SessionContext";

export default () => {
  const session = useContext(SessionContext);
  const isAuthenticated =
    session &&
    session.user &&
    typeof session?.user?.name === "string" &&
    typeof session?.user?.email === "string";

  return {
    isAuthenticated,
    currentUser: session && session.user ? { ...session.user } : null,
  };
};
