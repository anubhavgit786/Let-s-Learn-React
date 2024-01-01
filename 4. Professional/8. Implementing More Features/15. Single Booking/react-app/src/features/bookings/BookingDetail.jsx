import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';

import { useBooking } from './useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import ButtonText from '../../ui/ButtonText';
import Empty from '../../ui/Empty';
import Error from '../../ui/Error';


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetails = ({ booking })=>
{
  const moveBack = useMoveBack();
  const statusToTagName = { unconfirmed: 'blue', 'checked-in': 'green', 'checked-out': 'silver', };

  const { id: bookingId, status } = booking;
  return (
  <>
  <Row type='horizontal'>
    <HeadingGroup>
      <Heading type='h1'>Booking #{bookingId}</Heading>
      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
    </HeadingGroup>
    <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
  </Row>
  
  <BookingDataBox booking={booking} />
  <ButtonGroup>
    <Button variation='secondary' onClick={moveBack}>Back</Button>
  </ButtonGroup>
  </>)
}

const BookingDetail = ()=> 
{
  const { isLoading, isError, error, isSuccess, booking } = useBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;
  if (isError) return <Error message={error.message}/>;

  

  return (
    <>
      { isSuccess && (<BookingDetails booking={booking} />)}
    </>
  );
}

export default BookingDetail;
