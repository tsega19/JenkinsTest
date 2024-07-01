import { RegisterURL } from "../urls";
export async function registerAPI({ email, password, firstName, middleName, lastName, phoneNumber, businessName, }) {
    const data = JSON.stringify({
        email,
        password,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        businessName,
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
    const response = await fetch(RegisterURL, requestOptions);
    return response;
}
//# sourceMappingURL=register.js.map