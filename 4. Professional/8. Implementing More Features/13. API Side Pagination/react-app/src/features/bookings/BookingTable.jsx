import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import BookingRow from "./BookingRow";
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import Error from '../../ui/Error';

const BookingsTable = ({ bookings, count })=>
{
  return (
  <Menus>
    
    <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(booking) => (
          <BookingRow key={booking.id} booking={booking} />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  </Menus>)
}


const BookingTable = ()=> 
{
  const  { isLoading, isError, isSuccess, bookings, count,  error } = useBookings(); 
  return (
    <>
    { isLoading && (<Spinner />)}
    { !bookings.length && (<Empty resource="bookings" />)}
    { isSuccess && (<BookingsTable bookings={bookings} count={count} />)}
    { isError && (<Error message={error.message} />)}
    </>
  );
}

export default BookingTable;
