import React from "react";

import Spinner from "../Spinner";
import styles from "./styles.module.css";

const  SpinnerFullPage = ()=> 
{
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
