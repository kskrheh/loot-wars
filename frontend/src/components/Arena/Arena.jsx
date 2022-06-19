// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "../../features/users/usersSlice";
import {useState} from 'react'
import './App.css'

// import Modal from "../Modal/Modal";
import AppModalka from '../AppModalka/AppModalka';

function Arena() {
  const [modalActive, setModalActive] = useState(false)
  // const users = useSelector((state) => state.users);
  // console.log(users)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch])

  return (
    <>
      <h1>Enemies</h1>
    
      
      <AppModalka active={modalActive} setActive={setModalActive} />
    </>
  )
}

export default Arena;
