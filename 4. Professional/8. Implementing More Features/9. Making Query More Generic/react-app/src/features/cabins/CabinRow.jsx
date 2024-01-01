import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from './useDeleteCabin';
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";



import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';





const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;


const CabinRow = ({ cabin }) => 
{

  const { id:cabinID, name, maxCapacity:capacity, regularPrice:price, discount, image } = cabin;
 

  const { isDeleting, onDeleteCabin } = useDeleteCabin();
  const { isCreating:isDuplicating, createCabin } = useCreateCabin();

  const handleDuplicate = ()=>
  {
    const {name, id,  ...others} = cabin;
    createCabin({...others, name: `Copy of ${name}` });
  }
  
  return (
  <Table.Row>
    <Img src={image} name={name} />
    <Cabin>{name}</Cabin>
    <div>Fits up to {capacity} guests</div>
    <Price>{ formatCurrency(price) }</Price>
    { discount ? ( <Discount>{formatCurrency(discount)}</Discount>) : (<span>&mdash;</span>) }
    <div>
      <Modal>
      <Menus.Menu>
        <Menus.Toggle id={cabinID} />
        <Menus.List id={cabinID} >
          
          <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate} >Duplicate</Menus.Button>
          
          <Modal.Open opens="cabin-edit-form">
            <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
          </Modal.Open>
          
          <Modal.Open opens="cabin-delete">
            <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
          </Modal.Open>
          
        </Menus.List>
        <Modal.Window name="cabin-edit-form">
          <CreateCabinForm cabinToEdit={cabin}/>
        </Modal.Window>
        
        <Modal.Window name="cabin-delete">
          <ConfirmDelete resource="cabins" disabled={isDeleting} onConfirm={()=> onDeleteCabin(cabinID)} />
        </Modal.Window>
        </Menus.Menu>
      </Modal>
    </div>
  </Table.Row>
  )
}

export default CabinRow;
