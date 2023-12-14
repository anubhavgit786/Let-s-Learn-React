import React, { useState } from 'react';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

const Cabins = () => 
{
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = ()=>
  {
    setShowForm((showForm)=> !showForm);
  }

  return (
  <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter/sort</p>
    </Row>
    <Row>
      <CabinTable/>
      <Button onClick={handleShowForm}>{ showForm ? "Close" : "Add new cabin" }</Button>
      { showForm && (<CreateCabinForm/>)}
  </Row>
  </>
  )
}

export default Cabins;
