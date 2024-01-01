import React from 'react';
import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';



const CabinsTable = ({ cabins })=>
{
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || "all";
  let filteredCabins;

  if(filterValue === "all")
  {
    filteredCabins = cabins;
  }
  
  if(filterValue === "no-discount")
  {
    filteredCabins = cabins.filter((cabin)=> cabin.discount === 0)
  }

  if(filterValue === "with-discount")
  {
    filteredCabins = cabins.filter((cabin)=> cabin.discount > 0)
  }

  const sortBy = searchParams.get('sortBy') || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  const sortedCabins = filteredCabins.sort((a,b)=> direction === "asc" ? a[field] - b[field] : b[field] - a[field]);
  

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
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
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
