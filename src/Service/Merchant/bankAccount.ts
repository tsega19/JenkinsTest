import { addAccountUrl, getAccountsUrl } from "../urls";

export async function addAccount(
  token: string,
  {
    holderName,
    bank,
    accountNumber,
  }: { holderName: string; bank: string; accountNumber: string }
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ holderName, bank, accountNumber }),
    redirect: "follow",
  };
  const response = await fetch(addAccountUrl, requestOptions);
  return response;
}

export async function getBankAccountApi(token: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(getAccountsUrl, requestOptions);
  return response;
}
