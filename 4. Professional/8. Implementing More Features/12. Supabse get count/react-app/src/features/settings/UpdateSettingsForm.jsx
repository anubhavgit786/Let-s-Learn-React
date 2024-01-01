import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from "./useSettings";
import { useUpdateSetting } from './useUpdateSetting';

const UpdateSettings = ({ settings })=>
{
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
  const { isUpdating, updateSetting } = useUpdateSetting();
  const handleUpadte = (e, field)=>
  {
    if(!e.target.value)
    {
      return;
    }
    
    updateSetting({ [field]: e.target.value });
  }

  return ( 
  <Form>
    <FormRow label='Minimum nights/booking'>
      <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e)=> handleUpadte(e, "minBookingLength")} disabled={isUpdating} />
    </FormRow>
    <FormRow label='Maximum nights/booking'>
      <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={(e)=> handleUpadte(e, "maxBookingLength")}  disabled={isUpdating}/>
    </FormRow>
    <FormRow label='Maximum guests/booking'>
      <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={(e)=> handleUpadte(e, "maxGuestsPerBooking")} disabled={isUpdating} />
    </FormRow>
    <FormRow label='Breakfast price'>
      <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={(e)=> handleUpadte(e, "breakfastPrice")} disabled={isUpdating} />
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
