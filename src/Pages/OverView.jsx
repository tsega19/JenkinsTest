import { Card } from "../Components/Ui/Card";
import { MdAccountBalanceWallet } from "react-icons/md";
// import { BiErrorAlt } from "react-icons/bi";
import OverViewTable from "@/Components/form/OverViewTable";
export const OverView = () => {
    return (<div className="-z-10">
      <section>
        <div className="flex flex-wrap justify-center items-center md:gap-[2rem] lg:gap-[4rem] xl:gap-[7rem] gap-5">
          <Card header={"Ledger balance"} currency={"ETB"} amount={2500.0} icon={<MdAccountBalanceWallet size={"2rem"}/>} desc={"ETB 900.00 ready for payout"}/>
          <Card header={"Daily Revenue"} currency={"ETB"} amount={1500.0} icon={<MdAccountBalanceWallet size={"2rem"}/>} desc={"From 5 Sales"}/>
          <Card header={"Total Revenue"} currency={"ETB"} amount={750090.0} icon={<MdAccountBalanceWallet size={"2rem"}/>} desc={"120 sales made totally"}/>
        </div>
      </section>
      <div className="flex justify-center items-center p-20">
        <span className="w-[90%] h-[1px] border-[1px]"></span>
      </div>
      <section className=" mt-10">
        <div className="w-full h-full flex justify-start items-center">
          <h3 className="text-2xl font-bold">Daily Transactions</h3>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <OverViewTable />
          {/* <span>
          <BiErrorAlt size={"2rem"} className="text-red-600" />
        </span>
        <h4 className="text-xl font-medium">No Transaction yet</h4> */}
        </div>
      </section>
      <section className="h-screen"></section>
    </div>);
};
//# sourceMappingURL=OverView.jsx.map