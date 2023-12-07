"use client";
import React from "react";

export interface ISessionContext {
  user?: {
    email?: string;
    name?: string;
    image?: string;
  };
}

const SessionContext = React.createContext<ISessionContext | null | undefined>(
  null,
);

export default SessionContext;
