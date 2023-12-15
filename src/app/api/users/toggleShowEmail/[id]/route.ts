import { NextResponse } from "next/server";
import { maskEmailString } from "@/app/utils";
import { BASE_URL } from "../../route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id;
  if (userId !== undefined && userId !== null) {
    try {
      const { searchParams } = new URL(request.url);
      const showEmailParam = searchParams.get("show") || "false";
      const showEmail = showEmailParam === "true" ? true : false;

      const response = await fetch(`${BASE_URL}/users/${userId}`);
      const result = await response.json();

      const returnObj = {
        data: {
          ...result.data,
          email: showEmail
            ? result.data.email
            : maskEmailString(result.data.email),
          emailMasked: !showEmail,
        },
      };

      return NextResponse.json(returnObj);
    } catch (error) {
      console.log(error);
      console.error("Error in GET Users API:", error);
    }
  }
  return NextResponse.json({});
}
