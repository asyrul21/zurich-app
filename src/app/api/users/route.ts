import { maskEmailString } from "@/app/utils";

const BASE_URL = process.env.API_BASE_URL;

const recursiveGetUsers: (
  currentPage: number,
  pageData: unknown[],
) => Promise<unknown[]> = async (currentPage: number, pageData: unknown[]) => {
  const response = await fetch(`${BASE_URL}/users?page=${currentPage}`);
  const result = await response.json();
  if (result.page === result.total_pages) {
    return [...pageData, ...result.data];
  }
  return await recursiveGetUsers(result.page + 1, result.data);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maskEmailParamStr =
    searchParams.get("showEmailsFor") || JSON.stringify([]);
  const showEmailsFor = JSON.parse(maskEmailParamStr);

  try {
    let resultData = await recursiveGetUsers(1, []);

    resultData = resultData.filter((d: any) => {
      const firstCharFirstName = d.first_name.split("")[0];
      const firstCharLastName = d.last_name.split("")[0];
      return (
        firstCharFirstName.toLowerCase() === "g" ||
        firstCharLastName.toLowerCase() === "w"
      );
    });

    resultData = resultData.map((d: any) => {
      return {
        ...d,
        email: showEmailsFor.includes(d.id)
          ? d.email
          : maskEmailString(d.email),
      };
    });

    const returnObj = {
      data: resultData,
    };

    return Response.json(returnObj);
  } catch (error) {
    console.error("Error in GET Users API:", error);
  }
}
