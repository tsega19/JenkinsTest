import { IoMdArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/Hooks/useAuth";
import { ApiKeySchema } from "@/lib/validator";
import { GenerateApiKey, GetAllApiKeys, changeApiKeyStatusApi, removeApiKey, } from "@/Service/Merchant/ApiKey";
import { IoIosClose } from "react-icons/io";
export const Api = () => {
    const [showSecreteKey, setShowSecreteKey] = useState(false);
    const [rowId, setRowId] = useState(0);
    const [apiKeys, setApiKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [expirationDate, setExpirationDate] = useState(dayjs(Date.now()));
    const [keyId, setKeyId] = useState("");
    const [isDisable, setIsDisable] = useState(false);
    const { getToken } = useAuth();
    const userToken = getToken();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpen = (id) => {
        setDialogOpen(true);
        setKeyId(id);
    };
    const handleCloseDialog = () => setDialogOpen(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(ApiKeySchema),
    });
    const onSubmit = async (data) => {
        try {
            if (userToken) {
                console.log("api", data);
                const date = expirationDate ? expirationDate.toDate() : null;
                const response = await GenerateApiKey(userToken, data, date);
                if (response.ok) {
                    const data = await response.json();
                    fetchApiKeys();
                    handleClose();
                    return;
                }
                else {
                    const data = await response.json();
                    console.log("error", data);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const fetchApiKeys = async () => {
        try {
            if (userToken) {
                const response = await GetAllApiKeys(userToken);
                if (response.ok) {
                    const data = await response.json();
                    setApiKeys(data.body.clients);
                    return;
                }
                else {
                    const data = await response.json();
                    console.log("error", data);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        fetchApiKeys();
    }, []);
    const handleDelete = async (id) => {
        try {
            if (userToken) {
                const response = await removeApiKey(userToken, id);
                if (response.ok) {
                    fetchApiKeys();
                    setKeyId("");
                    handleCloseDialog();
                    return;
                }
                else {
                    const data = await response.json();
                    console.log("error", data);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleEdit = async (id, status) => {
        try {
            if (userToken) {
                const response = await changeApiKeyStatusApi(userToken, id, status);
                if (response.ok) {
                    fetchApiKeys();
                    setKeyId("");
                    return;
                }
                else {
                    const data = await response.json();
                    console.log("error", data);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const handelShowButton = (id) => {
        setShowSecreteKey(!showSecreteKey);
        setRowId(id);
    };
    return (<section className="w-[100%] mx-auto px-0 sm:px-6 lg:px-8">
      <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove this api key?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            this action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={() => handleDelete(keyId)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className="mb-10">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <button className="flex items-center text-secondary gap-2 hover:scale-95 text-sm cursor-pointer">
          More about API authentication
          <IoMdArrowForward />
        </button>
      </div>

      <div className="mb-20">
        <div className="mb-10">
          <div className="mt-5">
            <div className="flex justify-end p-3">
              <button className="px-10 p-2 rounded-md bg-primary text-white font-bold" onClick={handleOpen}>
                Generate Api Key
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-md border-b-2">
                  <th className="p-4">Application Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Secret Key</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {apiKeys.map((api, index) => (<>
                      <tr className="text-left text-sm" key={index}>
                        <td className="p-4">{api.label}</td>
                        <td className="p-4">{api.clientType}</td>
                        <td className="p-4 cursor-pointer" onClick={() => handelShowButton(index)}>
                          {index === rowId && showSecreteKey ? (api.secret) : (<span className="">
                              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            </span>)}
                        </td>
                        <td className="p-4">{api.status}</td>
                        <td className="p-4">{api.createdAt}</td>
                        <td className="p-4">
                          <button onClick={() => handleEdit(api.id, api.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")} className={`px-6 py-2 mr-3 ${api.status === "ACTIVE" ? "bg-red-500" : "bg-green-500"} rounded-md text-white`}>
                            {api.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}
                          </button>
                          <button onClick={() => handleClickOpen(api.id)} className="px-5 py-2 bg-primary rounded-md text-white">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col items-center  gap-4 bg-white w-[30rem] p-10 rounded-md">
              <h1 className="text-xl text-gray-800  font-bold">Add API KEY</h1>
              <button className="absolute right-6 top-3 text-2xl" onClick={handleClose}>
                <IoIosClose size={40}/>
              </button>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="text-gray-700 font-semibold">
                  Application Name:
                </label>
                <input type="text" {...register("label")} className="px-2 bg-gray-100 p-2 rounded-md"/>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="type" className="text-gray-700 font-semibold">
                  Type:
                </label>
                <select id="type" {...register("clientType")} className="border p-2 focus:outline-none rounded-md">
                  <option value="TEST">Test Mode</option>
                  <option value="PROD">Production</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker name="expirationDate" label="Api Expiration Date" value={expirationDate} onChange={(newValue) => setExpirationDate(newValue)} disabled={isDisable}/>
                  </DemoContainer>
                </LocalizationProvider>
                <div className="flex items-center justify-start gap-2">
                  <label htmlFor="" className="text-gray-700 font-semibold">
                    Never Expire
                  </label>
                  <input type="checkbox" className="w-4 h-4" onClick={() => setIsDisable(!isDisable)}/>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <button type="submit" className="px-10 p-2 rounded-md bg-primary text-white font-bold">
                  Generate
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </section>);
};
//# sourceMappingURL=Api.jsx.map