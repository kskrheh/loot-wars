
  import { useSelector } from 'react-redux';

  function Loot () {
    const weapon = useSelector((state) => state.title);
   
    
    
    return (
      <button type='button' onClick={}></button>
      <ul>
        {
          weapon.map((title) => <li key={title.id}>{title}</li>)
        }
      </ul>
    );
  }
  
  export default Loot;



  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //   const dispatch = useDispatch();
  //   const { weapon } = useSelector((store) => store.weapon);
  
  //   useEffect(() => {
  //     fetch("/loot")
  //       .then((res) => res.json())
  //       .then((data) => dispatch({ type: ADD_WEAPON, payload: title }));
  //   }, []);
  
  //   return (
  //     <>
  //       <h3>инфа</h3>
  
  //       <div>
  //         {weapon
  //           .map((el) => (
  //             <Equipped key={el.id} weapon={el} />
  //           ))}
  //       </div>
       
     
  //     </>
  //   );
  // };
