import React, { useState } from "react";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import styles from "../styles/App.module.scss";

const CreditCardWrapper = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [formInputValues, setFormInputValues] = useState(null);

  return (
    <div className={styles.red}>
      <CardItem
        setActiveItem={newItem => setActiveItem(newItem)}
        activeItem={activeItem}
        formInputValues={formInputValues}
      />
      <CardForm
        activeItem={activeItem}
        setActiveItem={newItem => setActiveItem(newItem)}
        setFormInputValues={newObjectValues =>
          setFormInputValues(newObjectValues)
        }
      />
    </div>
  );
};

export default CreditCardWrapper;
