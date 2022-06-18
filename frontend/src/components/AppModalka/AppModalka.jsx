import React from 'react';
import Modalka from '../Modalka/Modalka';
import {useState} from 'react'
import './AppModalka.css'

const AppModalka = () => {
  const [modalActive , setModalActive] = useState(false)
  return (
    <div className = 'app'>
      <div>
        <button className = 'open-btn' onClick={() => setModalActive(!modalActive)}>модалка</button>
      </div>
      <Modalka active = {modalActive} setActive={setModalActive}/>
    </div>
  );
}

export default AppModalka;
