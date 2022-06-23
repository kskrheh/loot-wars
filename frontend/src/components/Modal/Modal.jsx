import React from 'react';
import './Modal.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchFightUserUpdate, isFighting} from "../../features/user/userSlice";

const Modal = ({active, setActive, children}) => {
  const enemy = useSelector((state) => state.enemy.enemy)
  const dispatch = useDispatch();
  const userFight = useSelector((state) => state.user.user.fight)

  const handleClick = () => {
    setActive(false)
    if (userFight) {
    dispatch(fetchFightUserUpdate(enemy.id));
    }
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
