import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../App/utils/Api";
import { authApi } from "../../App/utils/authApi";
import { pattern } from "../../App/utils/validations";
import { BaseButton } from "../../BaseButton/BaseBatton";
import { Form } from "../../Form/Form";
import "../index.scss";

export const Login = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const sendData = async (data) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.token);
      navigate("/catalog");
    } catch (error) {
      console.log();
      alert("Неправильный логин или пароль");
    }
  };

  const emailRegister = register("email", {
    required: "Email обязателен",
  });
  const passwordRegister = register("password", {
    required: "Пароль обязателен",
    pattern,
  });
  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  return (
    <>
      <Form submitForm={handleSubmit(sendData)} title={"Вход"}>
        <div className="auth__controls">
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          ></input>
          {errors?.email && (
            <span className="ayth__info" style={{ color: "red" }}>
              {errors.email?.message}
            </span>
          )}
          <input
            type={"password"}
            {...passwordRegister}
            placeholder="password"
            className="auth__input"
          ></input>
          {errors?.password && (
            <span className="auth__info">{errors.password?.message}</span>
          )}
          <span
            className="auth__info auth__link"
            onClick={() => navigate("/reset-password")}
          >
            Восстановить пароль
          </span>
          <div className="auth__actions">
            <BaseButton type="submit" color={"pink"}>
              <span>Войти</span>
            </BaseButton>
            <BaseButton onClick={handleClick} color={"white"}>
              <span>Регистрация</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};
