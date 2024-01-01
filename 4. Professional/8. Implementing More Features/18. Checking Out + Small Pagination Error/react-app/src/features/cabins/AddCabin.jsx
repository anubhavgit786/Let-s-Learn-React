import React from 'react';
import Button from "../../ui/Button";
import CreateCabinForm from  "./CreateCabinForm";
import Modal from '../../ui/Modal';

const AddCabin = () => 
{
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-create-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-create-form">
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddCabin;


