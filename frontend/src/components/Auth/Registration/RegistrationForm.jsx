import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../../features/user/userSlice";
import styles from "./RegistrationForm.module.css";

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
          action="/auth/register"
          onSubmit={handleSubmit(goRegister)}
          method="post"
        >
          <label className={styles.lab} htmlFor="username">
            Username
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: "Обязательно к заполнению",
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
          <div style={{ color: "rgb(211, 237, 184)" }}>
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
          <label className={styles.lab} htmlFor="password">
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              {...register("password", {
                required: "Обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов!",
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(211, 237, 184)" }}>
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
          <label className={styles.lab} htmlFor="passwordRepeat">
            RepeatPassword
            <input
              className={styles.input}
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              {...register("passwordRepeat", {
                required: "Обязательно к заполнению",
                validate: {
                  isRepeat: (value) => getValues("password") === value,
                },
              })}
            />
            {errors.passwordRepeat?.type === "isRepeat" && (
              <p style={{ color: "rgb(211, 237, 184)" }}>{"Пароли не совпадают!"}</p>
            )}
          </label>

          <label className={styles.lab} htmlFor="email">
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: "Обязательно к заполнению",
                pattern: {
                  value: /@/,
                  message: "enter real email!",
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(211, 237, 184)" }}>
            {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
          </div>
          <button className={styles.button} type="submit">
            Register
          </button>
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
