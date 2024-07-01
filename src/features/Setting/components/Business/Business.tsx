import { useEffect, useState } from "react";
import BusinessTable from "./BusinessTable";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAvailableBusinessTypesApi,
  updateMyKycAPI,
} from "../../../../Service/Merchant/updateKycApi";
import useAuth from "../../../../Hooks/useAuth";
import { TKycUpdateSchema, kycUpdateSchema } from "../../../../lib/validator";
import { FileUploadApi } from "../../../../Service/Merchant/FileUploadApi";
import { RegisterKycFileApi } from "../../../../Service/Merchant/registerKycFileApi";
import { MerchantProfileUrl } from "../../../../Service/Merchant/merchantProfileApi";

export const Business = () => {
  const { getToken } = useAuth();
  const userToken = getToken();
  const [editAccount, setEditAccount] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [fileResponse, setFileResponse] = useState({});
  const [businessTypes, setBusinessTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [kyc, setKyc] = useState({
    name: "",
    type: {
      displayName: "",
      value: "",
    },
    tin: "",
    registrationNo: "",
    licenseNo: "",
    city: "",
    subCity: "",
    woreda: "",
    houseBldgNo: "",
    website: "",
    telephone: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TKycUpdateSchema>({
    resolver: zodResolver(kycUpdateSchema),
  });

  useEffect(() => {
    const getMerchantKyc = async () => {
      try {
        if (userToken) {
          const response = await MerchantProfileUrl(userToken);
          if (response.ok) {
            const data = await response.json();
            console.log("business", data.body.business);
            setKyc(data.body.business);
          } else {
            const data = await response.json();
            console.log(data);
          }
        } else {
          console.log("no token");
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    const getAvailableBusinessTypes = async () => {
      try {
        if (userToken) {
          const response = await getAvailableBusinessTypesApi(userToken);
          if (response.ok) {
            const data = await response.json();
            console.log("business Types", data);
            setBusinessTypes(data.body.availableBusinessTypes);
          } else {
            const data = await response.json();
            console.log(data);
          }
        } else {
          console.log("no token");
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    getAvailableBusinessTypes();
    getMerchantKyc();
  }, []);

  const onSubmit = async (data: TKycUpdateSchema) => {
    setSubmit(true);
    try {
      const kyc = {
        name: data.name,
        type: data.type,
        tin: data.tin || "",
        registrationNo: data.registrationNo || "",
        licenseNo: data.licenseNo || "",
        city: data.addressCity,
        subCity: data.addressSubCity,
        woreda: data.addressSubCity,
        houseBldgNo: data.addressHouseNo,
        website: data.website || "",
        telephone: data.telephone,
      };
      if (userToken) {
        const response = await updateMyKycAPI(kyc, userToken);
        if (response.ok) {
          console.log("success");
          return;
        } else {
          const data = await response.json();
          console.log("error", data);
        }
        setEditAccount(false);
      }
    } catch (e) {
      console.error(e);
    }
    setSubmit(false);
    setEditAccount(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
      console.log("file", files[0]);
    }
  };

  const fileUpload = async () => {
    try {
      setIsLoading(true);
      if (file && userToken) {
        const response = await FileUploadApi(file, userToken);
        if (response.ok) {
          const data = await response.json();
          setFileResponse(data.body);
          RegisterKycFile();
        } else {
          const data = await response.json();
          console.log("error", data);
        }
      } else {
        console.log("please upload a file");
        return;
      }
    } catch (ex) {
      console.log(ex);
      setIsLoading(false);
    }
  };

  const RegisterKycFile = async () => {
    try {
      if (fileResponse && userToken) {
        console.log("fileResponseId");
        const response = await RegisterKycFileApi(fileResponse, userToken);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          const data = await response.json();
          console.log("error", data);
        }
      } else {
        console.log("please upload a file");
      }
    } catch (ex) {
      console.log(ex);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:p-10 p-0">
          <div className="flex flex-col gap-10 mb-10 md:p-10 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="businessName" className="md:col-span-1">
                Business Name*
              </label>
              <input
                type="text"
                id="businessName"
                className={`${
                  errors.name ? "border-red-500 border" : ""
                } focus:outline-none px-3 py-2 rounded-md bg-gray-100 w-full md:col-span-3`}
                disabled={!editAccount}
                defaultValue={kyc.name}
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="businessType" className="md:col-span-1">
                Business Type*
              </label>
              <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
                <select
                  disabled={!editAccount}
                  className={`select ${
                    errors.type ? "border-red-500 border" : ""
                  } select-bordered w-full bg-gray-100 disabled:text-black disabled:cursor-default`}
                  {...register("type")}
                >
                  <option disabled selected>
                    {kyc.type.displayName
                      ? kyc.type.displayName
                      : "Choose Business Type"}
                  </option>
                  {businessTypes.map(
                    (type: { value: string; displayName: string }) => (
                      <option value={type.value}> {type.displayName}</option>
                    )
                  )}
                </select>
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
                  <label htmlFor="tin" className="whitespace-nowrap">
                    TIN:
                  </label>
                  <input
                    type="text"
                    id="tin"
                    defaultValue={kyc.tin}
                    className={` focus:outline-none px-3 py-2 bg-gray-100 rounded-md w-full md:w-auto`}
                    disabled={!editAccount}
                    {...register("tin")}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="registrationNo" className="md:col-span-1">
                Registration No:
              </label>
              <input
                type="text"
                id="registrationNo"
                defaultValue={kyc.registrationNo}
                className={`focus:outline-none px-3 py-2 md:col-span-3 bg-gray-100 rounded-md w-full`}
                disabled={!editAccount}
                {...register("registrationNo")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="licenseNo" className="md:col-span-1">
                License No:
              </label>
              <input
                type="text"
                id="licenseNo"
                defaultValue={kyc.licenseNo}
                className={`focus:outline-none px-3 py-2 md:col-span-3 bg-gray-100 rounded-md w-full`}
                disabled={!editAccount}
                {...register("licenseNo")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="Address" className="md:col-span-1">
                Address:
              </label>
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="city" className="text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    defaultValue={kyc.city}
                    className={`${
                      errors.addressCity ? "border-red-500 border" : ""
                    } focus:outline-none px-3 py-2 bg-gray-100 rounded-md w-full`}
                    disabled={!editAccount}
                    {...register("addressCity")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="subCity" className="text-sm">
                    Sub City
                  </label>
                  <input
                    type="text"
                    id="subCity"
                    defaultValue={kyc.subCity}
                    className={`${
                      errors.addressSubCity ? "border-red-500 border" : ""
                    } focus:outline-none px-3 py-2 bg-gray-100 rounded-md w-full`}
                    disabled={!editAccount}
                    {...register("addressSubCity")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="woreda" className="text-sm">
                    Woreda
                  </label>
                  <input
                    type="text"
                    id="woreda"
                    defaultValue={kyc.woreda}
                    className={`${
                      errors.addressWoreda ? "border-red-500 border" : ""
                    } focus:outline-none px-3 py-2 bg-gray-100 rounded-md w-full`}
                    disabled={!editAccount}
                    {...register("addressWoreda")}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="HNo/Bldg" className="text-sm">
                    HNo/Bldg
                  </label>
                  <input
                    type="text"
                    id="HNo/Bldg"
                    defaultValue={kyc.houseBldgNo}
                    className={`${
                      errors.addressHouseNo ? "border-red-500 border" : ""
                    } focus:outline-none px-3 py-2 bg-gray-100 rounded-md w-full`}
                    disabled={!editAccount}
                    {...register("addressHouseNo")}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="website" className="md:col-span-1">
                Website:
              </label>
              <input
                type="text"
                id="website"
                defaultValue={kyc.website}
                className={`focus:outline-none px-3 py-2 md:col-span-3 bg-gray-100 rounded-md w-full`}
                disabled={!editAccount}
                {...register("website")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <label htmlFor="businessTelephone" className="md:col-span-1">
                Business Telephone:
              </label>
              <input
                type="text"
                id="businessTelephone"
                defaultValue={kyc.telephone}
                className={`${
                  errors.telephone ? "border-red-500 border" : ""
                } focus:outline-none px-3 py-2 md:col-span-3 bg-gray-100 rounded-md w-full`}
                disabled={!editAccount}
                {...register("telephone")}
              />
            </div>
            <div className="flex justify-end">
              {editAccount ? (
                <button
                  type={submit ? "submit" : "button"}
                  className=" bg-primary text-sm md:text-lg text-white py-1 px-5 rounded-md"
                  onClick={() => setSubmit(true)}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  className=" bg-primary text-sm md:text-lg text-white py-1 px-5 rounded-md"
                  onClick={() => setEditAccount(!editAccount)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
        <div>
          <h1 className="text-2xl font-bold mb-5">Business Documents</h1>
          <div>
            <div className="w-full flex justify-end items-center p-5">
              <button
                className="px-10 p-2 flex justify-center items-center gap-2 bg-primary text-md font-medium text-white py-2 rounded-md"
                onClick={() => {
                  const element = document.getElementById(
                    "my_modal_3"
                  ) as HTMLDialogElement;
                  if (element) {
                    element.showModal();
                  }
                }}
              >
                <span>
                  <IoMdAdd size={"1.3rem"} />
                </span>
                Add
              </button>
            </div>
            <BusinessTable />
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Documents upload</h3>
          <div className="">
            <p className="py-4">Choose file type to upload</p>
            <select
              className="select select-bordered w-full"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option disabled selected>
                Choose file type to upload
              </option>
              <option value={"pdf"}>Han Solo</option>
              <option value={"jpg"}>Greedo</option>
            </select>
            <input
              type="file"
              onChange={onFileChange}
              className="file-input file-input-bordered w-full mt-8"
            />
            <div className="w-full flex justify-end items-center">
              <button
                onClick={fileUpload}
                className="flex justify-center items-center gap-2 mt-5 bg-primary border-primary py-1 px-3 rounded-md text-white"
              >
                {isLoading ? "Uploading" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
