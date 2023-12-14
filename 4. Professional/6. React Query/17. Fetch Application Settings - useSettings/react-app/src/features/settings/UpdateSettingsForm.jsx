import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from "./useSettings";

const UpdateSettings = ({ settings })=>
{
  const { id, minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
  return ( 
  <Form>
    <FormRow label='Minimum nights/booking'>
      <Input type='number' id='min-nights' defaultValue={minBookingLength} />
    </FormRow>
    <FormRow label='Maximum nights/booking'>
      <Input type='number' id='max-nights' defaultValue={maxBookingLength} />
    </FormRow>
    <FormRow label='Maximum guests/booking'>
      <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} />
    </FormRow>
    <FormRow label='Breakfast price'>
      <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} />
    </FormRow>
  </Form>)
}

const  UpdateSettingsForm = ()=> 
{
  const { isLoading, isError, isSuccess, settings, error } = useSettings();
  return (
  <>
  { isLoading && (<Spinner/>)}
  { isSuccess && (<UpdateSettings settings={settings}/>)}
  { isError && (<p>{error.message}</p>)}
  </>);
}

export default UpdateSettingsForm;
