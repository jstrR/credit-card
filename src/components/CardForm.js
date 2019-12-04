import React, { useEffect, useState } from "react";

//import styles from "../styles/App.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/*const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  field.onChange = e => {
    //e.target.value.replace(/\D/g, ""); // removes all non-numeric characters
    console.log(e.target.value);
    return (field.value = { ...e.target.value });
  };

  return (
    <>
      
      <input className="" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};*/

const CardFrom = props => {
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  return (
    <div>
      <h1>This is CardFrom</h1>
      <Formik
        initialValues={{
          cardNumber: "",
          cardHolder: ""
          // cardMonth: "",
          // cardYear: "",
          // cardCvv: ""
        }}
        validationSchema={Yup.object({
          cardNumber: Yup.string()
            .required("Card number is required")
            .matches(/^[0-9]{16}$/, "not Valid"),
          cardHolder: Yup.string()
            .matches(/^((?:[A-Za-z]+ ?){1,3})$/, "not Valid")
            .required("cardHolder is required")
        })}
        onSubmit={values => {
          alert(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <label htmlFor={"cardNumber"}>Card Number</label>
            <Field
              name="cardNumber"
              type="text"
              onChange={e => {
                const { value, name } = e.target;
                setFieldValue("cardNumber", value.replace(/\D/g, ""));
                setFormValues({
                  ...formValues,
                  [name]: value.replace(/\D/g, "")
                });
              }}
            />
            <ErrorMessage name="cardNumber" component="div" />

            <label htmlFor={"card"}>Card Holder</label>
            <Field
              name="cardHolder"
              type="text"
              onChange={e => {
                const { value, name } = e.target;
                setFieldValue("cardHolder", value.toUpperCase());
                setFormValues({ ...formValues, [name]: value });
              }}
            />
            <ErrorMessage name="cardHolder" component="div" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardFrom;
