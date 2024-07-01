import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiSearch } from "react-icons/ci";
import { FaChevronDown, FaDonate, FaLink, FaPlus, FaPencilAlt, } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineExplore, MdOutlineDocumentScanner, MdEventNote, } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbApi } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";
import { SwitchButton } from "../../Components/Ui/SwitchButton";
import useAuth from "@/Hooks/useAuth";
export const Header = () => {
    const [drop, setDrop] = useState(false);
    const [linkDrop, setLinkDrop] = useState(false);
    const linkDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const navigate = useNavigate();
    const { getUserData, logoutAuth } = useAuth();
    const userData = getUserData();
    const userLinks = [
        {
            Name: "Profile",
            path: "/profile",
            icon: <ImProfile />,
        },
        {
            Name: "Api",
            path: "/Api",
            icon: <TbApi />,
        },
        { Name: "Compliance", path: "compliance", icon: <FaPencilAlt /> },
        {
            Name: "Explore the Dashboard",
            path: "/Explore",
            icon: <MdOutlineExplore />,
        },
        { Name: "Status", path: "/Status", icon: <GrStatusInfo /> },
        {
            Name: "Setting",
            onclick: () => navigate("setting"),
            icon: <IoSettingsOutline />,
        },
        {
            Name: "Documentation",
            path: "/Documentation",
            icon: <MdOutlineDocumentScanner />,
        },
        {
            Name: "Logout",
            icon: <BiLogOutCircle className="text-red-500"/>,
            onclick: () => {
                logoutAuth();
                window.location.reload();
            },
        },
    ];
    const createLink = [
        {
            Name: "Create new Business",
            path: "createnewbusiness",
            icon: <FaPlus />,
        },
        { Name: "Payment Link", path: "#", icon: <FaLink /> },
        { Name: "Donation link", path: "#", icon: <FaDonate /> },
        { Name: "Event Link", path: "#", icon: <MdEventNote /> },
    ];
    const handleLinkClick = (path) => {
        navigate(path);
        setLinkDrop(false);
    };
    const handleUserItemClick = (onClick) => {
        if (onClick)
            onClick();
        setDrop(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click occurs outside of both dropdowns
            if (userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target) &&
                linkDropdownRef.current &&
                !linkDropdownRef.current.contains(event.target)) {
                setDrop(false);
                setLinkDrop(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (<nav className="sticky top-0 bg-white border-gray-100 border-b-[1px]">
      <div className="container mx-auto flex justify-between items-center h-16 ">
        <div className=" w-full md:w-auto lg:block hidden">
          <div className="flex items-center gap-3 ml-4 ">
            <CiSearch size={"1rem"} className="mr-3"/>
            <input type="text" placeholder="Search" className="w-full md:w-[30rem] py-2 focus:outline-none"/>
          </div>
        </div>
        <div className="flex items-center justify-end w-full px-5 lg:px-0">
          <div className="flex items-center gap-5">
            <div className="cursor-pointer lg:block hidden">
              <SwitchButton />
            </div>
            <IoSettingsOutline size={"1rem"} onClick={() => navigate("setting")} className="cursor-pointer lg:block hidden"/>
            <div className="p-[4px] rounded-full bg-primary text-white cursor-pointer lg:block hidden" title="Create Link" onClick={() => setLinkDrop(!linkDrop)}>
              <FaPlus size={"0.8rem"}/>
            </div>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <CiUser size={"1rem"} className="text-white"/>
            </div>
            <div className="text-xs text-gray-500 uppercase xl:block hidden">
              <p>
                {userData?.firstName} {userData?.lastName}
              </p>
              <p>ID5546857</p>
            </div>
            <FaChevronDown onClick={() => setDrop(!drop)} className="cursor-pointer"/>
          </div>

          <div ref={linkDropdownRef}>
            {linkDrop && (<div className="absolute right-[12rem] top-14 z-50">
                <div className="bg-white p-3 shadow-xl rounded-md">
                  <ul>
                    {createLink.map((item, index) => (<li key={index} className="flex items-center text-gray-500 gap-3 text-sm hover:bg-primary/90 hover:text-white p-2 rounded-md cursor-pointer" onClick={() => handleLinkClick(item.path)}>
                        <div className="text-2xl">{item.icon}</div>
                        <span>{item.Name}</span>
                      </li>))}
                  </ul>
                </div>
              </div>)}
          </div>

          <div ref={userDropdownRef}>
            {drop && (<div className="absolute right-10 top-14 z-10">
                <div className="bg-white p-3 shadow-xl rounded-md">
                  <ul className="flex flex-col">
                    {userLinks.map((item, index) => (<li key={index} className="flex items-center text-gray-500 gap-3 text-sm hover:bg-primary/90 hover:text-white p-2 rounded-md cursor-pointer" onClick={() => handleUserItemClick(item.onclick)}>
                        <div className="text-2xl" onClick={() => handleUserItemClick(item.onclick)}>
                          {item.icon}
                        </div>
                        <span>{item.Name}</span>
                      </li>))}
                  </ul>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </nav>);
};
//# sourceMappingURL=Header.jsx.map