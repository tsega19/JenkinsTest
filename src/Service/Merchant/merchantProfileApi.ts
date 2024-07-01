import { merchantProfileUrl } from "../urls";

export async function MerchantProfileUrl(token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(merchantProfileUrl, requestOptions);

  return response;
}
