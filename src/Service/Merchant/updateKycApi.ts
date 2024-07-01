import { getAvailableBusinessTypesUrl, updateMyKycUrl } from "../urls";

type merchantType = {
  name: string;
  type: string;
  tin: string;
  registrationNo: string;
  licenseNo: string;
  city: string;
  subCity: string;
  woreda: string;
  houseBldgNo: string;
  website: string;
  telephone: string;
};

export async function updateMyKycAPI(
  {
    name,
    type,
    tin,
    registrationNo,
    licenseNo,
    city,
    subCity,
    woreda,
    houseBldgNo,
    website,
    telephone,
  }: merchantType,
  token: string
) {
  const data = JSON.stringify({
    name,
    type,
    tin,
    registrationNo,
    licenseNo,
    city,
    subCity,
    woreda,
    houseBldgNo,
    website,
    telephone,
  });

  console.log(data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  const response = await fetch(updateMyKycUrl, requestOptions);
  console.log(response.body);
  return response;
}

export async function getAvailableBusinessTypesApi(token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(getAvailableBusinessTypesUrl, requestOptions);

  return response;
}
