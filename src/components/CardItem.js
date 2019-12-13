/* eslint-disable react/prop-types */
import React from "react";
import styles from "../styles/CardItem.module.scss";

const CardItem = ({ activeItem, formInputValues, setActiveItem }) => {
  return (
    <>
      <div className={styles.cardItem}>
        <div className={styles.front}>
          <div className={styles.cardItem__wrapper}>
            <div className={styles.cardItem__top}>
              <img src="../src/assets/card-chip.png" alt="card-chip" />
            </div>
            <div
              className={`${styles.cardItem__number}  ${
                activeItem === "cardNumber" ? styles.cardItem__active : ""
              }`}
            >
              <span
                data-refname="cardNumber"
                onClick={e => {
                  setActiveItem(e.target.dataset.refname);
                }}
              >
                {(formInputValues && formInputValues.cardNumber) ||
                  "#### #### #### ####"}
              </span>
            </div>

            <div className={styles.cardItem__row}>
              <div className={styles.cardItem__col}>
                <div
                  className={
                    activeItem === "cardHolder" ? styles.cardItem__active : ""
                  }
                  data-refname="cardHolder"
                  onClick={e => {
                    setActiveItem(e.currentTarget.dataset.refname);
                  }}
                >
                  <div className={styles.cardItem__col__sign}>Card Holder</div>
                  <span className={styles.cardItem__col__value}>
                    {(formInputValues && formInputValues.cardHolder) ||
                      "Full name"}
                  </span>
                </div>
              </div>

              <div className={styles.cardItem__col}>
                <div
                  data-refname="cardExpDate"
                  className={
                    activeItem === "cardExpDate" ? styles.cardItem__active : ""
                  }
                  onClick={e => {
                    setActiveItem(e.currentTarget.dataset.refname);
                  }}
                >
                  <div className={styles.cardItem__col__sign}>Expires</div>
                  <span className={styles.cardItem__col__value}>
                    {(formInputValues && formInputValues.cardExpDate) ||
                      "mm/yy"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.back}>
          <div
            className={`${
              activeItem === "cardCvv" ? styles.cardItem__active : ""
            } cardItem__cvv`}
            data-refname="cardCvv"
            onClick={e => {
              setActiveItem(e.currentTarget.dataset.refname);
            }}
          >
            <span>CVV</span>
            <span>{(formInputValues && formInputValues.cardCvv) || ""}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
