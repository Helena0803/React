import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../Utils/authApi";
import { pattern } from "../../Utils/validations";
import { BaseButton } from "../../BaseButton/BaseBatton";
import { Form } from "../../Form/Form";

export const Register = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(e);
    navigate("/login");
  };
  const sendData = async (data) => {
    //To do add groupId to req
    try {
      await authApi.registerUser({ ...data });
      navigate("/catalog");
    } catch (error) {
      alert("Erorr message");
    }
  };
  const emailRegister = register("email", {
    required: "Email обязателен",
  });
  const passwordRegister = register("password", {
    required: "Пароль обязателен",
    pattern: pattern,
  });
  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);
  return (
    <>
      <Form submitForm={handleSubmit(sendData)} title={"Регистрация"}>
        <div className="auth__controls">
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          ></input>
          {errors?.email && (
            <span className="auth__warning">{errors.email?.message}</span>
          )}
          <input
            type={"password"}
            {...passwordRegister}
            placeholder="password"
            className="auth__input"
          ></input>
          {errors?.password && (
            <span className="auth__warning">{errors.password?.message}</span>
          )}
          <span className="auth__info">
            Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
            Политикой конфиденциальности и соглашаетесь на информационную
            рассылку.
          </span>
          <div className="auth__actions">
            <BaseButton type="submit" color={"pink"}>
              <span>Зарегистрироваться</span>
            </BaseButton>
            <BaseButton onClick={handleClick} color={"white"}>
              <span>Войти</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};
