import { registerKycFileUrl } from "../urls";
export async function RegisterKycFileApi(fileResponse, token) {
    const fileId = fileResponse.id;
    console.log("file to upload", fileId);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ fileId }),
        redirect: "follow",
    };
    const response = await fetch(registerKycFileUrl, requestOptions);
    return response;
}
//# sourceMappingURL=registerKycFileApi.js.map