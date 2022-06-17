import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from './Modal.module.css';

function Modal({ active, setActive }) {
  const dispatch = useDispatch();

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
    <div className={active ? styles.modal.active : styles.modal} onClick={() => setActive(false)}>
      <div className={active ? styles.modal_content.active : styles.modal_content} onClick={event => event.stopPropagation()}>
        <div>Privet</div>
        <form>
          <input type='text' name='answer' className='answer' />
          <button type='submit'>Ответить</button>
        </form>
      </div>
    </div>
  )
}

export default Modal;
