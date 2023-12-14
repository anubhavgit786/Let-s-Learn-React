import React from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from "../../services/apiCabins";


const CreateCabinForm = ({ cabinToEdit = {}, onCloseEditForm }) => 
{
  const { id:editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =  useForm({ defaultValues: isEditSession ? {...editValues} : {}});
  const queryClient = useQueryClient();
  
  const { errors } = formState;

  const handleCreateCabinSuccess = ()=>
  {
    const message = isEditSession ? "Existing cabin edited successfully" : "New cabin created successfully";
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ["cabins"] });
    reset();
  }

  const handleCreateCabinError = (error)=>
  {
    toast.error(error.message);
  }

  const {isLoading:isCreating, mutate:createCabin } =  useMutation({ mutationFn: createEditCabin, onSuccess: handleCreateCabinSuccess, onError: handleCreateCabinError  });

  const {isLoading:isEditing, mutate:editCabin } =  useMutation({ mutationFn: ({ newCabinData, id })=> createEditCabin(newCabinData, id), onSuccess: handleCreateCabinSuccess, onError: handleCreateCabinError  });

  const onSubmit = (data) =>
  {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    
    if(isEditSession)
    {
      editCabin({newCabinData: {...data, image }, id:editId });
      onCloseEditForm(false);
      return;
    }

    createCabin({...data, image });

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

