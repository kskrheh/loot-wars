import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../../features/user/userSlice";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const errorLogin = useSelector((state) => state.user.errorLogin)
  const [isClicked, setIsClicked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();

  const goLogin = async (data) => {
    dispatch(fetchLogin(data));
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      {
        errorLogin && (
          <p>{errorLogin}</p>
        )
      }
      {isClicked ? (
        <form
        className={styles.formoc}
          
          action="/auth/login"
          method="post"
          onSubmit={handleSubmit(goLogin)}
        >
          <label className={styles.lab} htmlFor="username">
            Username
            <input className={styles.input}
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: "Be sure to fill in!",
              })}
            />
          </label>
          <div style={{ color: "rgb(237, 124, 83)" }}>
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
          <label className={styles.lab} htmlFor="password">
            Password 
            <input className={styles.input}
              type="password"
              name="password"
              id="password"
              {...register("password", { required: true })}
            />
          </label>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      ) : (
        <button className={styles.button} type="button" onClick={handleClick}>
          Login
        </button>
      )}
    </div>
  );
};

export default LoginForm;
