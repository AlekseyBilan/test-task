import React, { useRef } from 'react';
import { Form, Field, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';

const AddEmployees = (props:any) => {
    const form = useRef(null);
    const { onSubmit } = props;
    const formSubmit = (data:any) => {
      onSubmit(data);
      //@ts-expect-error
      form.current.resetForm();
    }

    return (
      <Form ref={form}
        onSubmit={formSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{maxWidth: 650}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Please fill in the fields:</legend>
              <div className="mb-3">
                <Field name={'name'} component={Input} label={'Name'} />
              </div>
              <div className="mb-3">
                <Field name={'jobTitle'} component={Input} label={'Job title'} />
              </div>
              <div className="mb-3">
                <Field name={"tenure"} component={Input} label={"Tenure"} />
              </div>
              <div className="mb-3">
                <Field name={"gender"} component={Input} label={"Gender"}/>
              </div>
            </fieldset>
            <div className="k-form-buttons">
              <button
                type={'submit'}
                className="k-button"
                disabled={!formRenderProps.allowSubmit}
                        >
                Add employee
              </button>
            </div>
          </FormElement>
            )}
        />
    );
};

export default AddEmployees;