import React, { useEffect, useRef } from "react";
import { LiaDonateSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { Box, Modal } from "@mui/material";
import { HiOutlineXMark } from "react-icons/hi2";

export const Donation = () => {
  const [open, setOpen] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <section className="p-5 sm:p-10 -z-10">
        <div className="flex flex-col sm:flex-row justify-start gap-5 sm:gap-10">
          <button
            className="py-2 bg-primary text-white px-4 rounded-md"
            onClick={handleOpen}
          >
            Create Donation Link
          </button>
          <span className="flex items-center gap-3 mt-3 sm:mt-0">
            <CiSearch size="1.5rem" />
            <input
              type="text"
              placeholder="Search name ..."
              className="focus:outline-none"
            />
          </span>
        </div>
      </section>
      <section className="p-5 mt-10 sm:mt-[10rem]">
        <div className="flex flex-col justify-center items-center text-center">
          <LiaDonateSolid size="4rem" className="text-primary" />
          <h1 className="text-lg font-normal">No Donation Link Found</h1>
          <p className="text-sm">
            Create Donation Link
            <span
              className="text-blue-400 underline font-medium cursor-pointer ml-1"
              onClick={handleOpen}
            >
              here
            </span>
          </p>
        </div>
      </section>
      <section>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              padding: 2,
            }}
          >
            <div
              className="bg-white w-full sm:w-[25vw] shadow-xl rounded-lg p-4 relative"
              ref={modalRef}
            >
              <h2 id="modal-title" className="text-2xl text-black">
                Create Donation Link
              </h2>
              <div className="flex flex-col items-center gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Donation Campaign Name"
                  className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"
                />
                <div className="flex items-center w-full relative">
                  <input
                    type="text"
                    placeholder="Donation Amount"
                    className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"
                  />
                  <select className="absolute right-2 bg-primary text-white rounded-md p-1">
                    <option value="ETB">ETB</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <label
                  htmlFor="imageUpload"
                  className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"
                >
                  Upload Image
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <textarea
                  placeholder="Purpose of Donation for Campaign"
                  className="bg-gray-200 rounded-md w-full p-2 focus:outline-none"
                ></textarea>
                <button className="w-full py-2 bg-primary rounded-md text-white font-medium mt-4">
                  Create
                </button>
              </div>

              <HiOutlineXMark
                size="1.6rem"
                className="absolute top-2 right-2 text-primary cursor-pointer"
                onClick={handleClose}
              />
            </div>
          </Box>
        </Modal>
      </section>
    </>
  );
};
