import React from "react";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import styles from "../styles/App.module.scss";

const App = props => {
  return (
    <div className={styles.red}>
      <CardItem />
      <CardForm />
    </div>
  );
};

export default App;
