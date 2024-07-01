import { LoginURL } from "../urls";
export async function loginAPI(email, password) {
    console.log(email, password);
    const data = JSON.stringify({
        email,
        password,
    });
    console.log(data);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Mode", "cors");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
    };
    const response = await fetch(LoginURL, requestOptions);
    return response;
}
//# sourceMappingURL=login.js.map