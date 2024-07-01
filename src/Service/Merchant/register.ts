import { RegisterURL } from "../urls";

type userType = {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
};

export async function registerAPI({
  email,
  password,
  firstName,
  middleName,
  lastName,
  phoneNumber,
  businessName,
}: userType) {
  const data = JSON.stringify({
    email,
    password,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    businessName,
  });

  console.log(data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  const response = await fetch(RegisterURL, requestOptions);

  return response;
}
