import { getAvailableBusinessTypesUrl, updateMyKycUrl } from "../urls";
export async function updateMyKycAPI({ name, type, tin, registrationNo, licenseNo, city, subCity, woreda, houseBldgNo, website, telephone, }, token) {
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
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: data,
        redirect: "follow",
    };
    const response = await fetch(updateMyKycUrl, requestOptions);
    console.log(response.body);
    return response;
}
export async function getAvailableBusinessTypesApi(token) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };
    const response = await fetch(getAvailableBusinessTypesUrl, requestOptions);
    return response;
}
//# sourceMappingURL=updateKycApi.js.map