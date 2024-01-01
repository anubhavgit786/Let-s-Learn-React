import React from 'react';
import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';



const CabinsTable = ({ cabins })=>
{
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      { cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id} /> )}
    </Table>
  )
}


const CabinTable = () => 
{
  const { isLoading, isError, isSuccess, cabins, error } = useCabins();

  return (
    <>
    { isLoading && (<Spinner/>)}
    { isSuccess && (<CabinsTable cabins={cabins} />)}
    { isError && (<p>{error.message}</p>)}
    </>
  )
}

export default CabinTable;
