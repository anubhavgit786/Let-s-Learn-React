import React from 'react';
import styles from "../Button/styles.module.css";
import { useNavigate } from 'react-router-dom';

const BackButton = () => 
{
    const navigate = useNavigate();
    const handleBack = (e)=>
    {
        e.preventDefault();
        navigate(-1);
    }
    return (<button onClick={handleBack} className={`${styles.btn} ${styles["back"]}`}>&larr; Back</button>);
}

export default BackButton;
