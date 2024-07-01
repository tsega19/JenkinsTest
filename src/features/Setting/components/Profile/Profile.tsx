import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import ProfileTable from "./ProfileTabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProfileUpdateSchema, profileUpdateSchema } from "../../../../lib/validator";
import { updateProfileAPI } from "../../../../Service/Merchant/updateProfileApi";
import { passwordChangeAPI } from "../../../../Service/Merchant/passwordChange";

export function Profile() {
  const { getUserData } = useAuth();
  const { getToken } = useAuth();
  const userData = getUserData();
  const userToken = getToken();
  const [editAccount, setEditAccount] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [passwordSubmit, setPasswordSubmit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fileName, setFileName] = useState("Upload your profile image");

  console.log(submit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileUpdateSchema>({
    resolver: zodResolver(profileUpdateSchema),
  });
  console.log(errors);
  const onSubmit = async (data: TProfileUpdateSchema) => {
    if (userToken) {
      try {
        const response = await updateProfileAPI(data, userToken);
        console.log(response);
        setEditAccount(false);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);
        console.log(error);
      }
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (userToken) {
      try {
        const response = await passwordChangeAPI(
          { oldPassword, newPassword },
          userToken
        );
        console.log(response);
        setEditPassword(false);
        setPasswordSubmit(false);
        setOldPassword("");
        setNewPassword("");
      } catch (err) {
        setPasswordSubmit(false);
        console.log(err);
      }
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Upload your profile image");
    }
  };
  return (
    <section>
      <div>
        <div className="space-y-5">
          <p className="text-xs text-[#F58634]">Setting</p>
        </div>
        {/* header */}
        <div className="p-4">
          <h2 className="pb-2 text-2xl">User</h2>
          <hr />
        </div>
        {/* inputs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 mb-10 bg-white p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="email" className="md:col-span-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="focus:outline-none px-3 py-2 md:col-span-3 rounded-md"
                disabled
                value={userData.email}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="profileImage" className="md:col-span-1">
                Profile Image
              </label>
              <div className="md:col-span-3 relative">
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profileImage"
                  className="block cursor-pointer focus:outline-none px-3 py-2 border-2 border-dashed border-gray-300 text-gray-500"
                >
                  {fileName}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="firstName" className="md:col-span-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={`${
                  editAccount ? "border-primary border rounded-md w-full" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 rounded-md uppercase`}
                disabled={!editAccount}
                value={userData.firstName}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="middleName" className="md:col-span-1">
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                {...register("middleName")}
                className={`${
                  editAccount ? "border-primary border rounded-md w-full" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 rounded-md uppercase`}
                disabled={!editAccount}
                value={userData.middleName}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="lastName" className="md:col-span-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={`${
                  editAccount ? "border-primary border rounded-md w-full" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 rounded-md uppercase`}
                disabled={!editAccount}
                value={userData.lastName}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="firstName" className="md:col-span-1">
                Phone No
              </label>
              <input
                type="text"
                id="phoneNo"
                // {...register("phoneNo")}
                className={`${
                  editAccount ? "border-primary border rounded-md w-full" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 rounded-md uppercase`}
                disabled={!editAccount}
                // value={userData.phoneNo}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="firstName" className="md:col-span-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                // {...register("password")}
                className={`${
                  editAccount ? "border-primary border rounded-md w-full" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 rounded-md uppercase`}
                disabled={!editAccount}
                // value={userData.password}
              />
            </div>
            <div className="flex justify-end">
              {editAccount ? (
                <button
                  type={submit ? "submit" : "button"}
                  className="px-5 w-16 bg-primary text-sm text-white py-1 rounded-md"
                  onClick={() => setSubmit(true)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-5 w-16 bg-primary text-sm text-white py-1 rounded-md"
                  onClick={() => setEditAccount(!editAccount)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
        <form onSubmit={handlePasswordSubmit}>
          <h1 className="text-xl font-medium mb-3">Change Password</h1>
          <hr />
          <div className="flex flex-col gap-10 mb-10 mt-5 bg-white p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="password1" className="md:col-span-1">
                Old Password
              </label>
              <input
                type="password"
                id="password1"
                className={`${
                  editPassword ? "border-primary border rounded-md w-full" : ""
                }focus:outline-none px-3 py-2 md:col-span-3 rounded-md`}
                disabled={!editPassword}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-x-4">
              <label htmlFor="password" className="md:col-span-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className={`${
                  editPassword ? "border-primary border rounded-md w-full" : ""
                }focus:outline-none px-3 py-2 md:col-span-3 rounded-md`}
                disabled={!editPassword}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              {editPassword ? (
                <button
                  type={passwordSubmit ? "submit" : "button"}
                  className="px-5 w-16 bg-primary text-sm text-white py-1 rounded-md"
                  onClick={() => setPasswordSubmit(true)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-5 w-40 bg-primary text-sm text-white py-1 rounded-md"
                  onClick={() => setEditPassword(!editPassword)}
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </form>
        {/* two step verification */}
        <div className="flex flex-col justify-center">
          <div className="">
            <h2 className="text-2xl pb-2">Two Step Verification</h2>
            <p className="text-sm pb-5">
              Enhance the security of your account by employing multiple
              authentication methods.
            </p>
            <button className="text-sm border-2 border-[#3E4095] p-1 px-10 rounded-md">
              Add Authentication
            </button>
          </div>
          <hr className="md:hidden" />
          <div className="mt-4 md:mt-0">
            <h2 className="text-2xl py-4">Login Sessions</h2>
            <p className="text-sm pb-5">
              Places where you're logged into kisPay.
            </p>
            <button className="text-sm border-2 border-[#3E4095] p-1 px-4 my-4 rounded-md">
              Sign Out All Other Sessions
            </button>
          </div>
        </div>
        <hr />
        <div>
          <ProfileTable />
        </div>
      </div>
    </section>
  );
}
