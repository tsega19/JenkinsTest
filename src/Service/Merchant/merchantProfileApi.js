import { merchantProfileUrl } from "../urls";
export async function MerchantProfileUrl(token) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const response = await fetch(merchantProfileUrl, requestOptions);
    return response;
}
//# sourceMappingURL=merchantProfileApi.js.map