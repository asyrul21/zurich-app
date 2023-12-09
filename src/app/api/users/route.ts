import { maskResultDataEmail } from "@/app/utils";
import { convertObjectToURLParams } from "@/state/utils";

const BASE_URL = process.env.API_BASE_URL;

const defaultApiParams = {
  maskEmail: false,
  page: 1,
  per_page: 6,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maskEmailParam = searchParams.get("maskEmail") || "false";
  const maskEmail = maskEmailParam === "true" ? true : false;

  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");

  const queryParams = {
    ...defaultApiParams,
    page,
    per_page,
  };

  const paramsString = convertObjectToURLParams({
    ...queryParams,
  });

  try {
    const response = await fetch(`${BASE_URL}/users?${paramsString}`);
    const result = await response.json();

    const returnObj = {
      ...result,
      data: maskEmail ? maskResultDataEmail(result.data) : result.data,
    };

    return Response.json(returnObj);
  } catch (error) {
    console.error("Error in GET Users API:", error);
  }
}
