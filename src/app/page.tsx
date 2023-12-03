import Image from "next/image";
import styles from "./page.module.css";
import PageTitle from "@/components/Page-Title/PageTitle";
import Link from "next/link";

export default function Home() {
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
