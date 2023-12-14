import React from 'react';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from "../../services/apiCabins";


const CreateCabinForm = () => 
{
  const { register, handleSubmit, reset, getValues, formState } =  useForm();
  const queryClient = useQueryClient();
  
  const { errors } = formState;

  const handleCreateCabinSuccess = ()=>
  {
    toast.success("New cabin created successfully");
    queryClient.invalidateQueries({ queryKey: ["cabins"] });
    reset();
  }

  const handleCreateCabinError = (error)=>
  {
    toast.error(error.message);
  }

  const {isLoading:isCreating, mutate } =  useMutation({ mutationFn: createCabin, onSuccess: handleCreateCabinSuccess, onError: handleCreateCabinError  });


  const onSubmit = (data) =>
  {
    mutate(data);
  }

  const onError = (errors) =>
  {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id='name' {...register('name', { required: "Cabin name is required" })} disabled={isCreating} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id='maxCapacity' {...register('maxCapacity', { required: "Max capacity of cabin is required", min: { value: 1, message: "Capacity should be atleast 1" } } )}  disabled={isCreating}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id='regularPrice' {...register('regularPrice', { required: "Price of cabin is required", min: { value: 1, message: "Price should be atleast 1" } } )}  disabled={isCreating}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id='discount' defaultValue={0} {...register('discount', { required: "Mention the discount on cabin", validate: (discount)=> discount <= getValues().regularPrice || "Discount should be less than regular price"  })}  disabled={isCreating}/>
      </FormRow>

      <FormRow label="Description for cabin">
        <Textarea type="text" id='description' {...register('description')}  disabled={isCreating}/>
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput type="upload" accept='image/*' id='image'  disabled={isCreating}/>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>Cancel</Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>

    </Form>
  )
}

export default CreateCabinForm;

