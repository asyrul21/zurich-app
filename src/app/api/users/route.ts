import { maskEmailString } from "@/app/utils";

const BASE_URL = process.env.API_BASE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maskEmailParamStr =
    searchParams.get("showEmailsFor") || JSON.stringify([]);
  const showEmailsFor = JSON.parse(maskEmailParamStr);

  try {
    // get total document ocunt
    const initResponse = await fetch(`${BASE_URL}/users`);
    const initResult = await initResponse.json();
    const total = initResult.total;

    const response = await fetch(`${BASE_URL}/users?per_page=${total}`);
    const result = await response.json();

    let resultData = result.data;
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
      ...result,
      data: resultData,
    };

    return Response.json(returnObj);
  } catch (error) {
    console.error("Error in GET Users API:", error);
  }
}
