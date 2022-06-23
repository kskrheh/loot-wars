import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../../features/user/userSlice";
import styles from './RegistrationForm.module.css'

const RegistrationForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();

  const goRegister = (data) => {
    dispatch(fetchRegister(data));
    reset();
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    
    <div className={styles.rega}>
      {isClicked ? (
        <form
          action="/api/auth/register"
          onSubmit={handleSubmit(goRegister)}
          method="post"
        >
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа!",
                },
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: "only english",
                },
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
              {...register("password", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов!",
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
          <label htmlFor="passwordRepeat">
            RepeatPassword
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              {...register("passwordRepeat", {
                required: "Поле обязательно к заполнению",
                validate: {
                  isRepeat: (value) => getValues("password") === value,
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            {errors.passwordRepeat?.type === "isRepeat" && (
              <p>{"Пароли не совпадают!"}</p>
            )}
          </div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /@/,
                  message: "enter real email!",
                },
              })}
            />
          </label>
          <div style={{ color: "red" }}>
            {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
          </div>
          <button className={styles.button} type="submit">Register</button>
        </form>
      ) : (
        <button className={styles.button} type="butto" onClick={handleClick}>
          Register
        </button>
      )}
    </div>
  );
};

export default RegistrationForm;
