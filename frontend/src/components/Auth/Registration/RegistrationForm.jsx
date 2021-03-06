import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../../features/user/userSlice";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const errorReg = useSelector((state) => state.user.errorReg);
  const [isClicked, setIsClicked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: "onSubmit" });
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
      {errorReg && <p>{errorReg}</p>}
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
                required: "Be sure to fill in!",
                minLength: {
                  value: 3,
                  message: "Minimum of 3 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum of 10 characters",
                },
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: "only english",
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(237, 124, 83)" }}>
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
                required: "Be sure to fill in!",
                minLength: {
                  value: 8,
                  message: "Minimum of 8 characters",
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(237, 124, 83)" }}>
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
                required: "Be sure to fill in!",
                validate: {
                  isRepeat: (value) => getValues("password") === value,
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(237, 124, 83)" }}>
            {errors.passwordRepeat?.type === "isRepeat" && (
              <p className={styles.pepe}>{"Passwords don't match"}</p>
            )}
          </div>
          <label className={styles.lab} htmlFor="email">
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              {...register("email", {
                required: "Be sure to fill in!",
                pattern: {
                  value:
                    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9??-????-??]{1}[-0-9??-??\.]{0,30}[0-9??-????-??]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/,
                  message: "enter real email!",
                },
              })}
            />
          </label>
          <div style={{ color: "rgb(237, 124, 83)" }}>
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
