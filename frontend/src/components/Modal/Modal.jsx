import React from 'react';
import './Modal.css'
import {useDispatch} from "react-redux";
import {isFighting} from "../../features/user/userSlice";

const Modal = ({active, setActive, children}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive(false)
    dispatch(isFighting());
  }

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={handleClick}
    >
      <div
        className={active ? "modal_content active" : "modal_content"}
        onClick={(e) => e.stopPropagation()} //чтоб не закрывалось при нажатии на модалку
      >
        {children}
      </div>
    </div>
  )
};

export default Modal;
