import CustomersTable from "../Components/form/CustomersTable";
import { FaFilePdf } from "react-icons/fa";
export const Customer = () => {
    return (<>
      <section className="p-10 mb-10 relative -z-10">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold ">Customers</h3>
          <div className="cursor-pointer mr-5">
            <FaFilePdf title="Download PDF" size={"2rem"}/>
          </div>
        </div>
        <div className="mt-20">
          <CustomersTable />
        </div>
      </section>
    </>);
};
//# sourceMappingURL=Customer.jsx.map