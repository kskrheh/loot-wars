import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../features/user/userSlice";
import { useForm } from "react-hook-form";
import styles from './LoginForm.module.css'

const LoginForm = () => {
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
      {isClicked ? (
        <form
          action="/api/auth/login"
          method="post"
          onSubmit={handleSubmit(goLogin)}
        >
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: "Поле обязательно к заполнению!",
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: true })}
            />
          </label>
          <button className={styles.button} type="submit">Login</button>
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
