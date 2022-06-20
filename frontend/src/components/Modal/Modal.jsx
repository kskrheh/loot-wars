<<<<<<< HEAD
<<<<<<<< HEAD:frontend/src/components/Modal/Modal.jsx
import React from 'react';
import './Modal.css'


const Modal = ({active, setActive , children}) => {
========
import React from "react";
import "./Modalka.css";

const Modalka = ({ active, setActive, children }) => {
>>>>>>>> b5b36057ecfb2de140be0ff804bc43d744305571:frontend/src/components/Modalka/Modalka.jsx
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()} //чтоб не закрывалось при нажатии на модалку
      >
        {children}
      </div>
<<<<<<<< HEAD:frontend/src/components/Modal/Modal.jsx

========
>>>>>>>> b5b36057ecfb2de140be0ff804bc43d744305571:frontend/src/components/Modalka/Modalka.jsx
    </div>
  );
};
=======
import { useState } from "react";
// import { useDispatch } from "react-redux";
import "./Modal.module.css";

function Modal({ active, setActive, children }) {
  const [modalActive, setModalActive] = useState(true);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const questionFetch = async () => {
  //     const response = await fetch(`/game/${idQuestion}`, {
  //       headers: { 'Content-type': 'application/json' },
  //       method: 'GET',
  //       credentials: 'include'
  //     })
  //     const data = await response.json();
  //     setCard(data);
  //   }
  //   questionFetch()
  // }, [idQuestion])
  return (
    <>
      <div
        className={active ? "modal active" : "modal"}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? "modal__content active" : "modal__content"}
          onClick={(e) => e.stopPropagation()} //чтоб не закрывалось при нажатии на саму модалку
        >
          {children}
          <div className="app">
            <div>
              <button className="open-btn" onClick={() => setModalActive(true)}>
                модалка
              </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive} />
          </div>
        </div>
      </div>
    </>
  );
}
>>>>>>> b5b36057ecfb2de140be0ff804bc43d744305571

export default Modal;
