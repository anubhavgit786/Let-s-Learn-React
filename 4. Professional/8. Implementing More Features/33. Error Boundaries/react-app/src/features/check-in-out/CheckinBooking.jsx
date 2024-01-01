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
import { useSettings } from "../settings/useSettings";
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
  const [addBreakfast, setAddBreakfast] = useState(booking.hasBreakfast);
  const moveBack = useMoveBack();

  const { isLoading:isSettingsLoading, isError:isSettingsError, isSuccess:isSettingsSuccess, settings, error: settingsError } = useSettings();
  
  
  const handleConfirmPaid = ()=>
  {
    setConfirmPaid((confirm)=> !confirm)
  }

  const handleAddBreakfast = ()=>
  {
    setAddBreakfast((add)=> !add)
    setConfirmPaid(false);
  }

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
  const { fullName } = guests;
  const { isChecking, checkin } = useCheckin();
  
  

  if (isSettingsLoading) return <Spinner />;
  if (!settings) return <Empty resource='booking' />;
  if (isSettingsError) return <Error message={settingsError.message}/>;
  
  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
  
  const handleCheckin = ()=> 
  {
    if(!confirmPaid)
    {
      return;
    }

    if(addBreakfast)
    {
      checkin({ id: bookingId, breakfast: { hasBreakfast: true, extraPrice: optionalBreakfastPrice, totalPrice: totalPrice + optionalBreakfastPrice } });
      return;
    }
    
    checkin({ id: bookingId, breakfast: {} });
  }

  return (
  <>
  <Row type='horizontal'>
      <Heading type='h1'>Check in booking #{bookingId}</Heading>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
    </Row>
    
    <BookingDataBox booking={booking} />
    
    {isSettingsSuccess && !hasBreakfast && (  
    <Box>
      <Checkbox checked={addBreakfast} onChange={handleAddBreakfast} id="breakfast">Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?</Checkbox>
    </Box>)}
    
    <Box>
      <Checkbox checked={confirmPaid} onChange={handleConfirmPaid} id="confirm" disabled={confirmPaid || isChecking} >I confirm that {fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice+optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}</Checkbox>
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
