"use client";
import React from "react";
import SessionContext, { ISessionContext } from "./SessionContext";

interface ISessionContextClientProps {
  children: React.ReactNode;
  session?: ISessionContext;
}

export default async function SessionContextClient({
  children,
  session,
}: ISessionContextClientProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
