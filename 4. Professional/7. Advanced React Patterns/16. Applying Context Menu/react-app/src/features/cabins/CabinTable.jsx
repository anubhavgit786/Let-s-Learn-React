import React from 'react';
import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';



const CabinsTable = ({ cabins })=>
{
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
      </Table>
    </Menus>
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
