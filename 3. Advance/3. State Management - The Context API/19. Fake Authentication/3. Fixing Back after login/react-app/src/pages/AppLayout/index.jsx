import React from 'react';
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import User from '../../components/User';
import styles from "./styles.module.css"

const AppLayout = () => 
{
  return (
    <div className={styles.app}>
     <Sidebar/>
     <Map/>
     <User/>
    </div>
  )
}

export default AppLayout;