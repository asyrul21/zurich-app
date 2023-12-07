"use client";
import PageTitle from "@/components/Page-Title/PageTitle";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }
  }, [isAuthenticated]);

  return (
    <div className="app_page">
      <PageTitle>Zurich App</PageTitle>
      <p>
        Welcome to the Zurich App. Please <Link href="/auth">Log In</Link> to
        continue.
      </p>
    </div>
  );
}
