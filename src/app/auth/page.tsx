"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import PageTitle from "@/components/Page-Title/PageTitle";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { isAuthenticated } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    signIn("google", { callbackUrl: "/users" });
  };

  return (
    <div>
      <PageTitle>Log In</PageTitle>
      <button
        className="app_button"
        style={{
          width: "220px",
        }}
        onClick={(e) => {
          e.preventDefault();
          handleLoginClick();
        }}
      >
        Log In with Google
      </button>
    </div>
  );
}
