import React, { useState } from 'react';
import styled from 'styled-components';
//import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from './useDeleteCabin';


import CreateCabinForm from "./CreateCabinForm";

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;
    
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }
`;

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
  const [showForm, setShowForm] = useState(false);

  const { id:cabinID, name, maxCapacity:capacity, regularPrice:price, discount, image } = cabin;
  
  const handleShowForm = ()=>
  {
    setShowForm((show)=> !show);
  }

  const { isDeleting, onDeleteCabin } = useDeleteCabin();

  
  return (
  <>
    <TableRow role='row'>
      <Img src={image} name={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {capacity} guests</div>
      <Price>{ formatCurrency(price) }</Price>
      { discount ? ( <Discount>{formatCurrency(discount)}</Discount>) : (<span>&mdash;</span>) }
      <div>
        <button onClick={handleShowForm}>{showForm ? "Close" : "Edit" }</button>
        <button onClick={()=> onDeleteCabin(cabinID)} disabled={isDeleting}>Delete</button>
      </div>
    </TableRow>
    { showForm && (<CreateCabinForm cabinToEdit={cabin} onCloseEditForm={setShowForm}/>)}
  </>
  )
}

export default CabinRow;
