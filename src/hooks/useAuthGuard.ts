"use client";
import { useContext, useEffect } from "react";
import SessionContext from "@/context/Session/SessionContext";
import { useRouter } from "next/navigation";
import useCurrentUser from "./useCurrentUser";

export default () => {
  const { isAuthenticated } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/unauthorized");
    }
  }, [router, isAuthenticated]);
};
