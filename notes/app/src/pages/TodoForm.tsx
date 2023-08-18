import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';

interface IValue {
  description: string;
}
export const TodoForm: React.FC = () => {
  const initialValue: IValue = {
    description: '',
  };
  const ipcRenderer = (window as any).ipcRenderer;

  const validationSchema = object({
    description: string().required(),
  });

  const onSubmit = (value: IValue) => {
    ipcRenderer.send('submit:todoform', value);
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='shadow border rounded-xl p-4 my-4'>
          <div className='my-4'>
            <label htmlFor="description" className='font-bold'>Task description</label>
            <Field name="description" component={TextField} placeholder="Enter Description" id="description" />
            <ErrorMessage component='span' className='text-red-500 text-sm' name="description" />
          </div>
          <Button text="Add" ></Button>
        </Form>
      </Formik>
    </div>
  );
};
