import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OverView } from "../Pages/OverView";
import { Transactions } from "../Pages/Transactions";
import { Customer } from "../Pages/Customer";
import { Donation } from "../Pages/Donation";
import { Event } from "../Pages/Event";
import Balance from "../Pages/Balance";
import PaymentLink from "../Pages/PaymentLink";
import { Layout } from "../Layouts/Layout";
import { LogIn } from "../Pages/LogIn";
import { SignUp } from "../Pages/SignUp";
import { Setting } from "../Pages/Setting";
import PrivateRoute from "./PrivateRoute";
import { RedirectAuthUsers } from "./RedirectAuthUsers";

export const Protected = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<OverView />} />
              <Route path="transaction" element={<Transactions />} />
              <Route path="payout" element={<Balance />} />
              <Route path="customer" element={<Customer />} />
              {/* <Route path="subaccount" element={<SubAccount />} /> */}
              <Route path="paymentlink" element={<PaymentLink />} />
              <Route path="donation" element={<Donation />} />
              <Route path="event" element={<Event />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Route>
          <Route path="/" element={<RedirectAuthUsers />}>
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
