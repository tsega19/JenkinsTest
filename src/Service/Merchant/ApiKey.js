import { changeApiKeyStatusUrl, generateApiKeyUrl, getApiKeyUrl, removeApiKeyUrl, } from "../urls";
export async function GenerateApiKey(token, { label, clientType }, expirationDate) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
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
export async function GetAllApiKeys(token) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const response = await fetch(getApiKeyUrl, requestOptions);
    return response;
}
export async function removeApiKey(token, apiKeyId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
    };
    const response = await fetch(`${removeApiKeyUrl}/${apiKeyId}`, requestOptions);
    return response;
}
export async function changeApiKeyStatusApi(token, authClient, status) {
    console.log("data to send", authClient, status);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
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
//# sourceMappingURL=ApiKey.js.map