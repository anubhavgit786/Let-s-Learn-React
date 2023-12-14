import React from 'react';
import styled from "styled-components";
import Input from 'ui/Input';
import Form from 'ui/Form';
import Button from 'ui/Button';
import FileInput from 'ui/FileInput';
import { Textarea } from 'ui/Textarea';

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
  return (
    <Form>

      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input type="text" id='name'/>
      </FormRow>
      
      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input type="number" id='maxCapacity'/>
      </FormRow>      
      
      <FormRow>
        <Label htmlFor='regularPrice'>Regular Price</Label>
        <Input type="number" id='regularPrice'/>
      </FormRow>
      
      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input type="number" id='discount'/>
      </FormRow>

       
      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea type="text" id='description'/>
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput type="text" id='image'/>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>Cancel</Button>
        <Button>Create new cabin</Button>
      </FormRow>

    </Form>
  )
}

export default CreateCabinForm;

