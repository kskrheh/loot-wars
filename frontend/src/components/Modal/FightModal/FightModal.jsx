import {useDispatch, useSelector} from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import { useEffect, useState } from "react";

function FightModal() {
    const enemy = useSelector((state) => state.enemy.enemy);
    const user = useSelector((state) => state.user.user);
    const [userWin, setUserWin] = useState();

    const shuffle = (arr) => {
        return arr.map(el => [Math.random(), el]).sort().map(el => el[1]);
    }

    useEffect(() => {

        const enemyWeapons = shuffle(enemy.weapons);
        const atkEnemyArr = enemyWeapons.map(weapon => weapon.ATK);
        const defEnemyArr = enemyWeapons.map(weapon => weapon.DEF);

        const userWeapons = shuffle(user.weapons)
        const atkUserArr = userWeapons.map(weapon => weapon.ATK);
        const defUserArr = userWeapons.map(weapon => weapon.DEF);

        let userScore = 0;
        let enemyScore = 0;

        for (let i = 0; i < 6; i ++) {
            if (atkUserArr[i] > defEnemyArr[i]) {
                userScore += 1;
            } else enemyScore += 1;

            if (atkEnemyArr[i] > defUserArr[i]) {
                enemyScore += 1;
            } else userScore += 1;
        }
        if(userScore > enemyScore) {
            setUserWin(true)
        } else setUserWin(false);
    }, [])

    return(
      <>
        <ul>
          {
          enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
        }
        </ul>
        <ul>
          {
          user.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
        }
        </ul>
        {
          userWin ? <p>Победа</p> : <p>Вы проиграли</p>
        }
      </>
    )
}

export default FightModal;
