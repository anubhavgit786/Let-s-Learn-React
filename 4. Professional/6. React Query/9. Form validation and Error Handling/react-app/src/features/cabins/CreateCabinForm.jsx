import React from 'react';
import styled from "styled-components";
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from "../../services/apiCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap:2.4rem;
  padding: 1.2rem 0;

  &:first-child{
    padding-top: 0;
  }

  &:last-child{
    padding-bottom: 0;
  }

  &:not(:last-child){
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button){
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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

      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input type="text" id='name' {...register('name', { required: "Cabin name is required" })} />
        { errors?.name?.message && (<Error>{errors.name.message}</Error>)}
      </FormRow>
      
      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input type="number" id='maxCapacity' {...register('maxCapacity', { required: "Max capacity of cabin is required", min: { value: 1, message: "Capacity should be atleast 1" } } )}/>
        { errors?.maxCapacity?.message && (<Error>{errors.maxCapacity.message}</Error>)}
      </FormRow>      
      
      <FormRow>
        <Label htmlFor='regularPrice'>Regular Price</Label>
        <Input type="number" id='regularPrice' {...register('regularPrice', { required: "Price of cabin is required", min: { value: 1, message: "Price should be atleast 1" } })}/>
        { errors?.regularPrice?.message && (<Error>{errors.regularPrice.message}</Error>)}
      </FormRow>
      
      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input type="number" id='discount' defaultValue={0} {...register('discount', { required: "Mention the discount on cabin", validate: (discount)=> discount <= getValues().regularPrice || "Discount should be less than regular price"  })}/>
        { errors?.discount?.message && (<Error>{errors.discount.message}</Error>)}
      </FormRow>

       
      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea type="text" id='description' {...register('description')}/>
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput type="upload" accept='image/*' id='image'/>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>Cancel</Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>

    </Form>
  )
}

export default CreateCabinForm;

