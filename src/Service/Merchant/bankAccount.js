import { addAccountUrl, getAccountsUrl } from "../urls";
export async function addAccount(token, { holderName, bank, accountNumber, }) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Mode", "cors");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ holderName, bank, accountNumber }),
        redirect: "follow",
    };
    const response = await fetch(addAccountUrl, requestOptions);
    return response;
}
export async function getBankAccountApi(token) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const response = await fetch(getAccountsUrl, requestOptions);
    return response;
}
//# sourceMappingURL=bankAccount.js.map