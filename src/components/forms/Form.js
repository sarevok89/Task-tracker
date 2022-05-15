import React from 'react';
import { Formik } from 'formik';

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    {...otherProps}
  >
    {() => <>{children}</>}
  </Formik>
);

export default Form;
