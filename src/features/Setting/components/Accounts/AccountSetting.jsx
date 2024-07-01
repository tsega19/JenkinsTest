import { useForm } from "react-hook-form";
import AccountTable from "./AccountTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankAccountSchema } from "@/lib/validator";
import { addAccount } from "@/Service/Merchant/bankAccount";
import useAuth from "@/Hooks/useAuth";
import { useRef } from "react";
export const AccountSetting = () => {
    const modalRef = useRef(null);
    const { getToken } = useAuth();
    const userToken = getToken();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(BankAccountSchema),
    });
    const onSubmit = async (data) => {
        try {
            if (userToken) {
                const response = await addAccount(userToken, data);
                if (response.ok) {
                    const data = await response.json();
                    if (modalRef.current) {
                        modalRef.current.close();
                    }
                    console.log(data.body);
                }
                else {
                    const data = await response.json();
                    console.log(data);
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
    };
    return (<section>
      <div>
        <AccountTable />
        <div>
          <button onClick={() => {
            if (modalRef.current) {
                modalRef.current.showModal();
            }
        }} className="px-10 bg-primary text-white py-2 rounded-md">
            Add Account
          </button>
        </div>
      </div>
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Bank Account Setting</h3>
            <div className="">
              <p className="pb-1 pt-4">Holder Name</p>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("holderName")}/>
              {errors.holderName && (<p className="text-red-500 p-1">{errors.holderName.message}</p>)}
              <p className="pb-2 pt-3">Bank Name</p>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("bank")}/>
              {errors.bank && (<p className="text-red-500 p-1">{errors.bank.message}</p>)}
              <p className="pb-2 pt-3">Account Number</p>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" {...register("accountNumber")}/>
              {errors.accountNumber && (<p className="text-red-500 p-1">
                  {errors.accountNumber.message}
                </p>)}
              <p className="pb-2 pt-4">Account Type</p>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  select account type
                </option>
                <option value={"pdf"}>primary</option>
                <option value={"jpg"}>Secondary</option>
              </select>
              <div className="w-full flex justify-end items-center">
                <button type="submit" className="flex justify-center items-center gap-2 mt-5 bg-primary border-primary py-1 px-3 rounded-md text-white">
                  {isSubmitting ? "adding..." : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </section>);
};
//# sourceMappingURL=AccountSetting.jsx.map