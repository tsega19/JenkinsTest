import { useState } from "react";
import kispay from "../assets/image/logo.png";
import { FaRegEye } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { useNavigate } from "react-router";
import { signUpSchema } from "@/lib/validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAPI } from "@/Service/Merchant/register";
import { Link } from "react-router-dom";
import { AppModal, triggerModal } from "@/Components/UseModal";
export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const modal = async (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        return await triggerModal();
    };
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: zodResolver(signUpSchema) });
    const onSubmit = async (data) => {
        try {
            const response = await registerAPI(data);
            if (response.status === 201) {
                console.log("response", response);
                navigate("/login");
            }
            else {
                const jsonData = await response.json();
                console.log("Error", jsonData.message);
                modal("Oops", jsonData.message);
            }
        }
        catch (error) {
            console.log(error);
            modal("Oops", "something went wrong please try again");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    return (<>
      <section className="w-full flex justify-center items-center my-10">
        <div className="absolute text-primary  left-0 top-0 p-10">
          <h1 className="text-3xl font-medium cursor-pointer z-10 text-white" onClick={() => navigate("/")}>
            Kispay
          </h1>
        </div>
        <div className="custom-shape-divider-top-1714647113">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="shadow-xl bg-white w-[90%] xl:w-[40%] lg:w-[40%] md:w-[50%]  px-5 p-5 rounded-lg z-10 ">
          <div>
            <img className="mx-auto h-10 w-auto" src={kispay} alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Merchant Registration Form
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="sm:flex sm:justify-between">
                <div className="sm:w-[32%]">
                  <label className="block text-sm font-medium leading-6 text-neutral-800">
                    First Name
                  </label>
                  <input {...register("firstName")} type="text" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.firstName ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`} id="firstName"/>
                </div>
                <div className="sm:w-[32%] mt-6 sm:mt-0">
                  <label className="block text-sm font-medium leading-6 text-neutral-800">
                    Middle Name
                  </label>
                  <input {...register("middleName")} type="text" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.middleName ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`} id="middleName"/>
                </div>
                <div className="sm:w-[32%] mt-6 sm:mt-0">
                  <label className="block text-sm font-medium leading-6 text-neutral-800">
                    Last Name
                  </label>
                  <input {...register("lastName")} type="text" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.lastName ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`} id="lastName"/>
                </div>
              </div>
              {errors && (<div className="sm:flex sm:justify-between">
                  {errors.firstName && (<div className="text-red-500">
                      {errors.firstName.message}
                    </div>)}
                  {errors.middleName && (<div className="text-red-500">
                      {errors.middleName.message}
                    </div>)}
                  {errors.lastName && (<div className="text-red-500">
                      {errors.lastName.message}
                    </div>)}
                </div>)}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-800">
                  Email address
                </label>
                <input {...register("email")} id="email" name="email" type="email" autoComplete="email" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.email ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`}/>
              </div>
              {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-neutral-800">
                  Phone Number
                </label>
                <input {...register("phoneNumber")} id="phoneNumber" name="phoneNumber" type="number" autoComplete="phoneNumber" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.phoneNumber ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`}/>
              </div>
              {errors.phoneNumber && (<div className="text-red-500">{errors.phoneNumber.message}</div>)}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-neutral-800">
                  Business name
                </label>{" "}
                <input {...register("businessName")} type="text" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.businessName ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`} id="businessName"/>
              </div>
              {errors.businessName && (<div className="text-red-500">
                  {errors.businessName.message}
                </div>)}
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-800">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input {...register("password")} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${errors.email ? "ring-red-500" : "ring-gray-300"} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2`}/>
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                    {showPassword ? <RxEyeClosed /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
              </div>
              <div>
                <label htmlFor="referralCode" className="block text-sm font-medium leading-6 text-neutral-800">
                  Referral code
                </label>
                <input {...register("referralCode")} type="text" className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" id="referralCode"/>
              </div>
              {errors.referralCode && (<div className="text-red-500">
                  {errors.referralCode.message}
                </div>)}
              <div className="flex items-center mt-5">
                <input {...register("agreement")} type="checkbox" id="consent" className={`mr-2`}/>
                <label htmlFor="consent" className={`text-sm  cursor-pointer ml-5 ${errors.agreement ? "text-red-500" : "text-gray-900"}`}>
                  I consent to the collection and processing of my personal data
                  in line with data regulations as described in the kispay{" "}
                  <Link to={""} className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  &{" "}
                  <Link to={"#"} className="text-primary hover:underline">
                    Merchant Service Agreement
                  </Link>
                </label>
              </div>
              {errors.agreement && (<div className="text-red-500">{errors.agreement.message}</div>)}
              <button type="submit" className="w-full py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/60 focus:outline-none">
                {isSubmitting ? "Signing Up ..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an Account ?
              <a href="#" className="font-semibold leading-6 text-neutral-800 hover:text-secondary p-10 hover:underline" onClick={() => navigate("/login")}>
                Sign In
              </a>
            </p>
          </div>
        </div>
      </section>
      <AppModal title={modalTitle} content={modalContent} onClose={() => { }}/>
    </>);
};
//# sourceMappingURL=SignUp.jsx.map