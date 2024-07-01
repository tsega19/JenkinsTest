import { SideMenu } from "./SideMenu/SideMenu";
import { Header } from "./Header/Header";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideMenu />
        <div className="flex flex-col w-full">
          <Header />
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
