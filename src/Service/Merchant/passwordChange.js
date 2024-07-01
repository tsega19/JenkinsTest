import { passwordChangeUrl } from "../urls";
export async function passwordChangeAPI({ oldPassword, newPassword }, token) {
    const data = JSON.stringify({
        oldPassword,
        newPassword,
    });
    console.log(data);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Mode", "cors");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
    };
    const response = await fetch(passwordChangeUrl, requestOptions);
    return response;
}
//# sourceMappingURL=passwordChange.js.map