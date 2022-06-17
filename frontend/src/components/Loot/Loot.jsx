import { useSelector, useDispatch, } from "react-redux";
import { findLoot } from "../../features/loot/lootSlice";

function Loot() {
  const weapon = useSelector((state) => state.title);

  const dispatch = useDispatch();
  fetch('/loot')
    .then((res) => res.json())
    .then(data => dispatch(findLoot))

  const handleClick = () => {
    dispatch(findLoot());
  };

  return (
    <>
      <button type="button" onClick={handleClick}></button>
      <ul>
        {/* {weapon.map((el) => (
          <li key={el.id}>{}</li>
        ))} */}
      </ul>
    </>
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
