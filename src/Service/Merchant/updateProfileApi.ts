import { updateProfileUrl } from "../urls";

type userType = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export async function updateProfileAPI(
  { firstName, middleName, lastName }: userType,
  token: string
) {
  const data = JSON.stringify({
    firstName,
    middleName,
    lastName,
  });

  console.log(data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  const response = await fetch(updateProfileUrl, requestOptions);

  return response;
}
