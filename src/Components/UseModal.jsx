import React from "react";
export const AppModal = ({ title, content, onClose = () => { }, }) => {
    const modalDOMId = "modal_dialog";
    return (<dialog id={modalDOMId} className="modal">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => onClose()} className="btn btn-sm bg-gray-200 hover:bg-gray-400 border-gray-200 text-black">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>);
};
const modalDOMId = "modal_dialog";
export const triggerModal = () => {
    const modalElement = document.getElementById(modalDOMId);
    if (modalElement) {
        modalElement.showModal();
    }
};
//# sourceMappingURL=UseModal.jsx.map