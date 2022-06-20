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

export default Modal;
