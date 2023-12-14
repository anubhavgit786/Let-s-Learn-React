import React from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';


const CreateCabinForm = ({ cabinToEdit = {}, onCloseEditForm }) => 
{
  const { id:editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, formState, reset } =  useForm({ defaultValues: isEditSession ? {...editValues} : {}});
  
  const { errors } = formState;
  
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  

  const onSubmit = (data) =>
  {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    
    if(isEditSession)
    {
      editCabin({newCabinData: {...data, image }, id:editId }, { onSuccess: (data)=> reset() });
      onCloseEditForm(false);
      return;
    }

    createCabin({...data, image }, { onSuccess: (data)=> reset() });

  }

  const onError = (errors) =>
  {
    console.log(errors);
  }

  const isWorking = isCreating || isEditing;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id='name' {...register('name', { required: "Cabin name is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id='maxCapacity' {...register('maxCapacity', { required: "Max capacity of cabin is required", min: { value: 1, message: "Capacity should be atleast 1" } } )}  disabled={isWorking}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id='regularPrice' {...register('regularPrice', { required: "Price of cabin is required", min: { value: 1, message: "Price should be atleast 1" } } )}  disabled={isWorking}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id='discount' defaultValue={0} {...register('discount', { required: "Mention the discount on cabin", validate: (discount)=> discount <= getValues().regularPrice || `${discount} Discount should be less than regular price ${getValues().regularPrice}`  })}  disabled={isWorking}/>
      </FormRow>

      <FormRow label="Description for cabin">
        <Textarea type="text" id='description' {...register('description')}  disabled={isWorking}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput accept='image/*' id='image' {...register('image', { required: isEditSession ? false : "Cabin photo is required" })}/>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>Cancel</Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>

    </Form>
  )
}

export default CreateCabinForm;

