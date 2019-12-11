/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/App.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CardFrom = props => {
  const cardNumber = useRef(null);
  const cardHolder = useRef(null);
  const cardExpDate = useRef(null);
  const cardCvv = useRef(null);

  const formInputRefs = {
    cardNumber,
    cardHolder,
    cardExpDate,
    cardCvv
  };

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    props.setFormInputValues(formValues);
  }, [formValues]);

  useEffect(() => {
    if (
      props.activeItem &&
      formInputRefs[props.activeItem] &&
      formInputRefs[props.activeItem].current &&
      formInputRefs[props.activeItem].current.name
    ) {
      formInputRefs[props.activeItem].current.focus();
    }
  }, [props.activeItem]);

  return (
    <div>
      <h1>This is CardFrom</h1>
      <Formik
        initialValues={{
          cardNumber: "",
          cardHolder: "",
          cardExpDate: "",
          cardCvv: ""
        }}
        validationSchema={Yup.object({
          cardNumber: Yup.string()
            .required("Card number is required")
            .matches(/^[0-9]{16}$/, "not Valid"),
          cardHolder: Yup.string()
            .required("Card holder is required")
            .matches(/^([A-Za-z]{3,})\s([A-Za-z]{3,})/, "not Valid"),
          cardExpDate: Yup.string()
            .required("Card Date is required. Example: MM/YY")
            .matches(
              /([0-9]{2})\/([0-9]{2})/,
              "Not a valid expiration date. Example: MM/YY"
            )
            .test(
              "test-credit-card-expiration-date",
              "Invalid Month",
              expirationDate => {
                if (!expirationDate) return false;
                const [expMonth] = expirationDate.split("/");
                return Number(expMonth) <= 12;
              }
            )
            .test(
              "test-credit-card-expiration-date",
              "Invalid Expiration Date in past",
              expirationDate => {
                if (!expirationDate) return false;
                const today = new Date();
                const monthToday = today.getMonth() + 1;
                const yearToday = today
                  .getFullYear()
                  .toString()
                  .substr(-2);

                const [expMonth, expYear] = expirationDate.split("/");
                return (
                  Number(expYear) > Number(yearToday) ||
                  (Number(expMonth) > monthToday &&
                    Number(expYear) >= Number(yearToday))
                );
              }
            ),
          cardCvv: Yup.string()
            .required("Card Cvv is required")
            .matches(/^[0-9]{3,4}$/, "CVV not Valid")
        })}
        onSubmit={values => {
          alert(values);
        }}
      >
        {({ setFieldValue, handleBlur }) => (
          <Form className={styles.form}>
            <label htmlFor={"cardNumber"}>Card Number</label>
            <Field
              name="cardNumber"
              innerRef={cardNumber}
              type="text"
              onChange={e => {
                const { value, name } = e.target;
                const newValue = value.replace(/\D/g, "");
                setFieldValue("cardNumber", newValue);
                setFormValues({
                  ...formValues,
                  [name]: newValue
                });
              }}
              onFocus={e => {
                props.setActiveItem(e.target.name);
              }}
              onBlur={e => {
                handleBlur(e);
                props.setActiveItem("");
              }}
            />
            <ErrorMessage name="cardNumber" component="div" />

            <label htmlFor={"cardHolder"}>Card Holder</label>
            <Field
              name="cardHolder"
              type="text"
              innerRef={cardHolder}
              onChange={e => {
                const { value, name } = e.target;
                const newValue = value.toUpperCase();
                setFieldValue("cardHolder", newValue);
                setFormValues({ ...formValues, [name]: newValue });
              }}
              onFocus={e => {
                props.setActiveItem(e.target.name);
              }}
              onBlur={e => {
                handleBlur(e);
                props.setActiveItem("");
              }}
            />
            <ErrorMessage name="cardHolder" component="div" />

            <label htmlFor={"cardExpDate"}>Expiration Date</label>
            <Field
              name="cardExpDate"
              type="text"
              innerRef={cardExpDate}
              onChange={e => {
                const { value, name } = e.target;
                setFieldValue("cardExpDate", value);
                setFormValues({ ...formValues, [name]: value });
              }}
              onFocus={e => {
                props.setActiveItem(e.target.name);
              }}
              onBlur={e => {
                handleBlur(e);
                props.setActiveItem("");
              }}
            />
            <ErrorMessage name="cardExpDate" component="div" />

            <label htmlFor={"cardCvv"}>Card Cvv</label>
            <Field
              name="cardCvv"
              type="text"
              innerRef={cardCvv}
              onChange={e => {
                const { value, name } = e.target;
                setFieldValue("cardCvv", value);
                setFormValues({ ...formValues, [name]: value });
              }}
              onFocus={e => {
                props.setActiveItem(e.target.name);
              }}
              onBlur={e => {
                handleBlur(e);
                props.setActiveItem("");
              }}
            />
            <ErrorMessage name="cardCvv" component="div" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardFrom;

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
