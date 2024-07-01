import { passwordChangeUrl } from "../urls";

type passwordType = {
  oldPassword: string;
  newPassword: string;
};

export async function passwordChangeAPI(
  { oldPassword, newPassword }: passwordType,
  token: string
) {
  const data = JSON.stringify({
    oldPassword,
    newPassword,
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

  const response = await fetch(passwordChangeUrl, requestOptions);

  return response;
}
