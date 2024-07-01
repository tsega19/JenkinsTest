import { fileUploadUrl } from "../urls";

export async function FileUploadApi(file: File, token: string) {
  console.log("file to upload", file);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(fileUploadUrl, requestOptions);

  return response;
}
