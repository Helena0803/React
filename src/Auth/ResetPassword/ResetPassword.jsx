import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../Utils/authApi";
import { pattern } from "../../Utils/validations";
import { BaseButton } from "../../BaseButton/BaseBatton";
import { Form } from "../../Form/Form";

export const ResetPass = ({ setShowModal }) => {
  const [tokenResp, setTokenResp] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const emailRegister = register("email", {
    required: "Email обязателен",
  });

  const sendData = async (data) => {
    console.log({ data });
    if (!tokenResp) {
      try {
        const res = await authApi.resetPass(data);
        console.log({ res });
        setTokenResp(true);
      } catch (error) {
        console.log({ error });
        alert("Что-то пошло не так");
      }
    } else {
      try {
        const res = await authApi.changePass(data.token, {
          password: data.password,
        });
        console.log({ res });
        localStorage.setItem("token", res.token);
        navigate("/catalog");
      } catch (error) {
        console.log({ error });
        alert("Что-то пошло не так");
      }
    }
  };
  const passwordRegister = register("password", {
    required: tokenResp ? "Пароль обязателен" : false,
    pattern: pattern,
  });

  useEffect(() => {
    setShowModal(true);
  }, [setShowModal]);

  const navigate = useNavigate();
  return (
    <>
      <Form submitForm={handleSubmit(sendData)} title={"Восстановление пароля"}>
        <div className="auth__controls">
          <span className="auth__info" style={{ textAlign: "left" }}>
            Для получения временного пароля необходимо ввести email, указанный
            при регистрации.
          </span>
          <input
            type="text"
            {...emailRegister}
            placeholder="Email"
            className="auth__input"
          ></input>
          {errors?.email && (
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          )}
          {tokenResp && (
            <>
              <input
                type={"password"}
                {...passwordRegister}
                placeholder="password"
                className="auth__input"
                disabled={!tokenResp}
              />
              {errors?.password && (
                <span className="auth__warning">
                  {errors.password?.message}
                </span>
              )}
              <input
                type={"text"}
                {...register("token", {
                  required: tokenResp ? "Token обязателен" : false,
                })}
                placeholder="token"
                className="auth__input"
                disabled={!tokenResp}
              />
            </>
          )}
          <span className="auth__info auth__back" onClick={() => navigate(-1)}>
            Назад
          </span>
          <span className="auth__info">
            Срок действия временного пароля 24 ч.
          </span>
          <div className="auth__actions">
            <BaseButton color={"pink"}>
              <span>Отправить</span>
            </BaseButton>
          </div>
        </div>
      </Form>
    </>
  );
};
