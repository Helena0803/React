import { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { ReactComponent as Eye } from "./eye-regular.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RegistrationForm = ({ sendData, flag = true }) => {
  const [type, setType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
    sendData(data);
  };
  console.log({ errors });

  const nameRegister = {
    required: {
      value: flag,
      message: "Это поле обязательно для заполнения",
    },
    minLength: {
      value: 2,
      message: "Слишком короткое имя",
    },
  };

  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Регистрация</h3>
          <input
            type="text"
            {...register("name", nameRegister)}
            placeholder="Имя"
            className="form__input"
          />
          {errors?.name && (
            <span style={{ color: "grey" }}>{errors.name?.message}</span>
          )}

          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="form__input"
          ></input>
          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "Пароль обязателен для регистрации",
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="Пароль"
              className="form__input"
            ></input>
            {/* <Eye className="eye" title="show" /> */}
            {/* <FontAwesomeIcon faEye className="eye" title="hide" /> */}
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "hide" : "show"}
            </span>
          </div>
          {errors?.password && (
            <span style={{ color: "grey" }}>{errors.password?.message}</span>
          )}
          <button type="submit">Регистрация</button>
        </form>
      </div>
    </>
  );
};
