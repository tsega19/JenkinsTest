import { MdOutlineDashboard, MdAccountBalanceWallet, MdEventNote, } from "react-icons/md";
import { FaUsers, FaLink, FaDonate } from "react-icons/fa";
// import { BsSubtract } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { RiMenu3Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import kispay from "../../assets/image/logo.png";
import tweeter from "../../assets/image/Twitter X Icon.png";
export const SideMenu = () => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    // Function to handle screen size
    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    };
    // Set the initial state based on screen width
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const Links = [
        {
            Name: "Overview",
            Path: "",
            icon: <MdOutlineDashboard size="1.5rem"/>,
            spacing: true,
        },
        {
            Name: "Transaction",
            Path: "transaction",
            icon: <GrTransaction size="1.5rem"/>,
        },
        {
            Name: "Payout",
            Path: "payout",
            icon: <MdAccountBalanceWallet size="1.5rem"/>,
        },
        {
            Name: "Customer",
            Path: "customer",
            icon: <FaUsers size="1.5rem"/>,
            spacing: true,
        },
        // {
        //   Name: "Subaccounts",
        //   Path: "subaccount",
        //   icon: <BsSubtract size="1.5rem" />,
        //   spacing: true,
        // },
        {
            Name: "Payment Links",
            Path: "paymentlink",
            icon: <FaLink size="1.5rem"/>,
        },
        { Name: "Donation", Path: "donation", icon: <FaDonate size="1.5rem"/> },
        { Name: "Events", Path: "event", icon: <MdEventNote size="1.5rem"/> },
    ];
    return (<nav className="relative z-10">
      <div className={`transition-all duration-500 ${open ? "lg:pl-[17rem] pl-0" : "pl-0"} `}>
        <div className={`fixed top-0 left-0 h-screen pt-8 bg-white border-r-2 transition-width duration-500 
          ${open ? "w-[17rem]" : "w-0"} font-Roboto`}>
          <div className="mt-[5rem]">
            <div className="flex items-center justify-center gap-10 mb-[5rem]">
              <img src={kispay} className={`transition-transform duration-500 ${!open && "scale-0"} w-[6rem]`} alt="Kispay"/>
              <img src={tweeter} className={`transition-transform duration-500 ${!open && "scale-0"} w-[6rem]`} alt="Tweeter"/>
              <div className={`cursor-pointer absolute ${open ? "left-[13rem] top-0" : "left-7 top-0"}`} onClick={() => setOpen(!open)}>
                <label htmlFor="" className="text-sm font-semibold">
                  Menu
                </label>
                <RiMenu3Fill size="2.2rem" className="bg-primary p-2 text-white rounded-xl"/>
              </div>
            </div>
            <ul className="pt-2">
              {Links.map((item, index) => (<li key={index} onClick={() => {
                navigate(`/${item.Path}`);
                if (window.innerWidth < 1024) {
                    setOpen(false);
                }
            }} className={`flex items-center gap-x-4 cursor-pointer p-2 px-10 hover:bg-primary hover:text-white rounded-md transition-colors ${!open && "scale-0"}
                  ${item.spacing ? "mb-8" : ""} 
                  ${location.pathname === `/${item.Path}` ||
                (location.pathname === "/" && item.Path === "")
                ? "bg-primary text-white"
                : "text-neutral-700"}`}>
                  <Link className="flex items-center gap-4" to={item.Path}>
                    <div className=" mx-1.5">{item.icon}</div>
                    <div className="transition-transform duration-50">
                      {item.Name}
                    </div>
                  </Link>
                </li>))}
            </ul>
          </div>
        </div>
      </div>
    </nav>);
};
//# sourceMappingURL=SideMenu.jsx.map