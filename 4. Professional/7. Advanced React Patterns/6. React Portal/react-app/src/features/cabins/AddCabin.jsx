import React, { useState } from 'react';
import Button from "../../ui/Button";
import CreateCabinForm from  "./CreateCabinForm";
import Modal from '../../ui/Modal';

const AddCabin = () => 
{
  const [isOpenModal, setOpenModal] =  useState(false);
  
  const handleOpenForm = ()=>
  {
    setOpenModal(true);
  }

  const handleCloseForm = ()=>
  {
    setOpenModal(false);
  }

  return (
    <div>
      <Button onClick={handleOpenForm}>Add new cabin</Button>
      { isOpenModal && (<Modal onCloseModal={handleCloseForm}><CreateCabinForm onCloseModal={handleCloseForm}/></Modal>)}
    </div>
  )
}

export default AddCabin;

