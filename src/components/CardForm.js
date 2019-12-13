/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputMask from "react-input-mask";
import * as Yup from "yup";
import styles from "../styles/CardForm.module.scss";

const CardFrom = ({ activeItem, setActiveItem, setFormInputValue }) => {
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

  useEffect(() => {
    if (
      activeItem &&
      formInputRefs[activeItem] &&
      formInputRefs[activeItem].current &&
      formInputRefs[activeItem].current.name
    ) {
      formInputRefs[activeItem].current.focus();
    }
  }, [activeItem]);

  return (
    <>
      <Formik
        initialValues={{
          cardNumber: "",
          cardHolder: "",
          cardExpDate: "",
          cardCvv: ""
        }}
        validationSchema={Yup.object({
          cardNumber: Yup.string()
            .required("Card Number is required")
            .matches(/^[0-9 ]{19}$/, "Not Valid Card Number"),
          cardHolder: Yup.string()
            .required("Card Holder is required")
            .matches(
              /^([A-Za-z]{3,})\s([A-Za-z]{3,})/,
              "Not Valid Card Holder"
            ),
          cardExpDate: Yup.string()
            .required("Card Date is required. Example: MM/YY")
            .matches(
              /([0-9]{2})\/([0-9]{2})/,
              "Not a valid expiration date. Example: MM/YY"
            )
            .max(5, "Maximum 5 characters")
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
          <Form className={styles.cardForm}>
            <div className={styles.cardForm__input}>
              <label htmlFor={"cardNumber"}>Card Number</label>
              <Field name="cardNumber" id="cardNumber" type="text">
                {({ field }) => (
                  <InputMask
                    {...field}
                    mask="9999 9999 9999 9999"
                    maskPlaceholder="#"
                    ref={cardNumber}
                    onFocus={e => {
                      setActiveItem(e.target.name);
                    }}
                    onBlur={e => {
                      handleBlur(e);
                      setActiveItem("");
                    }}
                    onChange={e => {
                      const { value, name } = e.target;
                      setFieldValue("cardNumber", value);
                      setFormInputValue({
                        [name]: value
                      });
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="cardNumber"
                render={msg => (
                  <div className={styles.cardForm__error}>{msg}</div>
                )}
              />
            </div>

            <div className={styles.cardForm__input}>
              <label htmlFor={"cardHolder"}>Card Holder</label>
              <Field
                name="cardHolder"
                id="cardHolder"
                type="text"
                innerRef={cardHolder}
                onChange={e => {
                  const { value, name } = e.target;
                  const newValue = value.toUpperCase();
                  setFieldValue("cardHolder", newValue);
                  setFormInputValue({
                    [name]: value
                  });
                }}
                onFocus={e => {
                  setActiveItem(e.target.name);
                }}
                onBlur={e => {
                  handleBlur(e);
                  setActiveItem("");
                }}
              />
              <ErrorMessage
                name="cardHolder"
                render={msg => (
                  <div className={styles.cardForm__error}>{msg}</div>
                )}
              />
            </div>

            <div className={styles.cardForm__row}>
              <div className={styles.cardForm__col}>
                <div className={styles.cardForm__input}>
                  <label htmlFor={"cardExpDate"}>Expiration Date</label>
                  <Field name="cardExpDate" id="cardExpDate" type="text">
                    {({ field }) => (
                      <InputMask
                        {...field}
                        mask="99/99"
                        maskPlaceholder="-"
                        placeholder="MM/YY"
                        ref={cardExpDate}
                        onFocus={e => {
                          setActiveItem(e.target.name);
                        }}
                        onBlur={e => {
                          handleBlur(e);
                          setActiveItem("");
                        }}
                        onChange={e => {
                          const { value, name } = e.target;
                          setFieldValue("cardExpDate", value);
                          setFormInputValue({
                            [name]: value
                          });
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="cardExpDate"
                    render={msg => (
                      <div className={styles.cardForm__error}>{msg}</div>
                    )}
                  />
                </div>
              </div>

              <div className={styles.cardForm__col}>
                <div className={styles.cardForm__input}>
                  <label htmlFor={"cardCvv"}>Card Cvv</label>
                  <Field
                    name="cardCvv"
                    id="cardCvv"
                    type="text"
                    innerRef={cardCvv}
                    onChange={e => {
                      const { value, name } = e.target;
                      setFieldValue("cardCvv", value);
                      setFormInputValue({
                        [name]: value
                      });
                    }}
                    onFocus={e => {
                      setActiveItem(e.target.name);
                    }}
                    onBlur={e => {
                      handleBlur(e);
                      setActiveItem("");
                    }}
                  />
                  <ErrorMessage
                    name="cardCvv"
                    render={msg => (
                      <div className={styles.cardForm__error}>{msg}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.cardForm__submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CardFrom;
