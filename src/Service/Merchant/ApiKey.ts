import {
  changeApiKeyStatusUrl,
  generateApiKeyUrl,
  getApiKeyUrl,
  removeApiKeyUrl,
} from "../urls";

export async function GenerateApiKey(
  token: string,
  { label, clientType }: { label: string; clientType: string },
  expirationDate: Date | null
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      label,
      clientType,
      expirationDate,
    }),
    redirect: "follow",
  };

  const response = await fetch(generateApiKeyUrl, requestOptions);
  return response;
}

export async function GetAllApiKeys(token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(getApiKeyUrl, requestOptions);
  return response;
}

export async function removeApiKey(token: string, apiKeyId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `${removeApiKeyUrl}/${apiKeyId}`,
    requestOptions
  );
  return response;
}

export async function changeApiKeyStatusApi(
  token: string,
  authClient: string,
  status: string
) {
  console.log("data to send", authClient, status);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      authClient,
      status,
    }),
    redirect: "follow",
  };

  const response = await fetch(changeApiKeyStatusUrl, requestOptions);
  return response;
}
