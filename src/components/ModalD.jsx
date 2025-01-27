import React from "react";
import style from '../style/ModalD.module.css';

export default function ModalD({ closeModal, linkToDelete, handleDelete }) {

  const handleConfirmDelete = () => {
    if (linkToDelete) {
      handleDelete(linkToDelete._id); // Call the handleDelete function with the link ID
      closeModal(); // Close the modal after deletion
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.overlay} onClick={closeModal}></div>
      <div className={style.modalContent}>
        <p> Are you sure, you want to remove it ? </p>
        <button className={style.closeModal} onClick={closeModal}>
          x
        </button>
        <div className={style.confirmDel}>
            <button className={style.confirmNo} onClick={closeModal}>
                No
            </button>
            <button className={style.confirmDelete} onClick={handleConfirmDelete}>
            Yes
            </button>
        </div>
      </div>
    </div>
  );
}
