import React, { useState, useRef, useEffect } from "react";
import { HiLink } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Box, Modal } from "@mui/material";
import { HiOutlineXMark } from "react-icons/hi2";
const PaymentLink = () => {
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    return (<>
      <section className="p-5 sm:p-10 -z-10">
        <div className="flex flex-col sm:flex-row justify-start gap-5 sm:gap-10">
          <button className="py-2 bg-primary text-white px-4 rounded-md" onClick={handleOpen}>
            Create Payment Link
          </button>
          <span className="flex items-center gap-3">
            <CiSearch size="1.5rem"/>
            <input type="text" placeholder="Search name ..." className="focus:outline-none"/>
          </span>
        </div>
      </section>
      <section className="p-5 mt-10 sm:mt-[10rem]">
        <div className="flex flex-col justify-center items-center text-center">
          <HiLink size="4rem" className="text-primary"/>
          <h1 className="text-lg font-normal">No Payment Link Found</h1>
          <p className="text-sm">
            Create Payment Link
            <span className="text-blue-400 underline font-medium cursor-pointer ml-1" onClick={handleOpen}>
              here
            </span>
          </p>
        </div>
      </section>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: 2,
        }}>
          <div ref={modalRef} className="bg-white w-full sm:w-[25vw] shadow-xl rounded-lg p-4 relative">
            <h2 id="modal-title" className="text-2xl text-black">
              Create Payment Link
            </h2>
            <div className="flex flex-col items-center gap-4 mt-4">
              <input type="text" placeholder="Name for payment Link" className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"/>
              <div className="flex items-center w-full relative">
                <input type="text" placeholder="How Much" className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"/>
                <select className="absolute right-2 bg-primary text-white rounded-md p-1">
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <textarea placeholder="Description" className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"></textarea>
              <button className="w-full py-2 bg-primary rounded-md text-white font-medium mt-4">
                Create
              </button>
            </div>
            <HiOutlineXMark size="1.6rem" className="absolute top-2 right-2 text-sky-800 cursor-pointer" onClick={handleClose}/>
          </div>
        </Box>
      </Modal>
    </>);
};
export default PaymentLink;
//# sourceMappingURL=PaymentLink.jsx.map