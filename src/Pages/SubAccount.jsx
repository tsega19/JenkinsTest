import { SubAccountTable } from "../Components/form/SubAccountTable";
export const SubAccount = () => {
    return (<>
      <section className="py-10 px-4 sm:px-10 md:px-20 -z-10">
        <div className="flex flex-col md:flex-row justify-between gap-6  rounded-md p-5">
          <h1 className="text-xl md:text-2xl text-neutral-800 font-medium">
            We require additional details regarding your identity.
          </h1>
          <button className="px-6 py-2 bg-primary text-white rounded-md mt-4 md:mt-0">
            Verify
          </button>
        </div>
      </section>
      <section>
        <div>
          <SubAccountTable />
        </div>
      </section>
    </>);
};
//# sourceMappingURL=SubAccount.jsx.map