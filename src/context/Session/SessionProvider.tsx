import SessionContextClient from "./SessionContextClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { ISessionContext } from "./SessionContext";

export default async function SessionProvider({ children }: any) {
  const session = await getServerSession(authOptions);

  return (
    <SessionContextClient session={session as ISessionContext}>
      {children}
    </SessionContextClient>
  );
}
