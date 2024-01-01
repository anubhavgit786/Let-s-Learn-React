import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import BookingDataBox from '../bookings/BookingDataBox';
import { useBooking } from '../bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './useCheckin';
import Checkbox from "../../ui/Checkbox";
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Error from '../../ui/Error';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';



const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBookings = ({ booking })=>
{

  const [confirmPaid, setConfirmPaid] = useState(booking.isPaid);
  const moveBack = useMoveBack();

  const handleConfirmPaid = ()=>
  {
    setConfirmPaid((confirm)=> !confirm)
  }

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
  const { fullName } = guests;
  const { isChecking, checkin } = useCheckin();
  
  const handleCheckin = ()=> 
  {
    if(!confirmPaid)
    {
      return;
    }
    
    checkin(bookingId);
  }
  return (
  <>
  <Row type='horizontal'>
      <Heading type='h1'>Check in booking #{bookingId}</Heading>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
    </Row>
    
    <BookingDataBox booking={booking} />
    <Box>
      <Checkbox checked={confirmPaid} onChange={handleConfirmPaid} id="confirm" disabled={confirmPaid || isChecking} >I confirm that {fullName} has paid the total amount {formatCurrency(totalPrice)}</Checkbox>
    </Box>
    <ButtonGroup>
      <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>Check in booking #{bookingId}</Button>
      <Button variation='secondary' onClick={moveBack}>Back</Button>
    </ButtonGroup>
  </>)
}

const CheckinBooking = ()=> 
{
  const { isLoading, isError, error, isSuccess, booking } = useBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;
  if (isError) return <Error message={error.message}/>;


  
  return (
    <>
    { isSuccess && (<CheckinBookings booking={booking} />)}    
    </>
  );
}

export default CheckinBooking;
