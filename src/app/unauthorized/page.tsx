import PageTitle from "@/components/Page-Title/PageTitle";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="app_page">
      <PageTitle>Unauthorized</PageTitle>
      <p>
        You are not authorized to view this page. Please{" "}
        <Link href="/auth">Log In</Link> to continue.
      </p>
    </div>
  );
}
