/* eslint-disable react/prop-types */
import React from "react";

import styles from "../styles/App.module.scss";

const CardItem = props => {
  return (
    <div>
      <h1>This is CardItem</h1>
      <div className={props.activeItem === "cardNumber" ? styles.active : ""}>
        <span
          data-refname="cardNumber"
          onClick={e => {
            props.setActiveItem(e.target.dataset.refname);
          }}
        >
          {(props.formInputValues && props.formInputValues.cardNumber) ||
            "#### #### #### ####"}
        </span>
      </div>
      <div className={props.activeItem === "cardHolder" ? styles.active : ""}>
        <span
          data-refname="cardHolder"
          onClick={e => {
            props.setActiveItem(e.target.dataset.refname);
          }}
        >
          Card Name
        </span>
        <span>
          {(props.formInputValues && props.formInputValues.cardHolder) || ""}
        </span>
      </div>
      <div className={props.activeItem === "cardExpDate" ? styles.active : ""}>
        <span
          data-refname="cardExpDate"
          onClick={e => {
            props.setActiveItem(e.target.dataset.refname);
          }}
        >
          mm/yy
        </span>
        <span>
          {(props.formInputValues && props.formInputValues.cardExpDate) || ""}
        </span>
      </div>
      <div className={props.activeItem === "cardCvv" ? styles.active : ""}>
        <span
          data-refname="cardCvv"
          onClick={e => {
            props.setActiveItem(e.target.dataset.refname);
          }}
        >
          CVV
        </span>
        <span>
          {(props.formInputValues && props.formInputValues.cardCvv) || ""}
        </span>
      </div>
    </div>
  );
};

export default CardItem;
