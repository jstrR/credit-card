import React, { useState } from "react";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import styles from "../styles/CreditCardWrapper.module.scss";

const CreditCardWrapper = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [formInputValues, setFormInputValues] = useState({});

  return (
    <div className={styles.creditCardWrapper}>
      <CardItem
        setActiveItem={newItem => setActiveItem(newItem)}
        activeItem={activeItem}
        formInputValues={formInputValues}
      />
      <CardForm
        activeItem={activeItem}
        setActiveItem={newItem => setActiveItem(newItem)}
        setFormInputValue={newInputValue => {
          setFormInputValues({ ...formInputValues, ...newInputValue });
        }}
      />
    </div>
  );
};

export default CreditCardWrapper;
