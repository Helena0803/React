import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../BaseButton/BaseBatton";
import { UserContext } from "../context/userContext";
import { Form } from "../Form/Form";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../storageToolKit/slices/user/userSlice";

export const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { setIsAuthentificated } = useContext(UserContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentUser = useSelector((s) => s.user.data);

  // const handleChangeAvatar = async () => {
  //   await api.updateAvatar({ avatar: "https://i.yapx.cc/RZ9k0.jpg" });
  // };
  const sendProfileData = async (data) => {
    await dispatch(updateUser({ name: data.name, about: data.about }));
  };

  const reqired = {
    reqired: { value: true },
  };

  const sendAvatar = async ({ avatar }) => {
    await dispatch(updateUser({ avatar: avatar }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthentificated(false);
    navigate("/login");
  };

  return (
    <div className="profile">
      <div className="auth__info" onClick={() => navigate(-1)}>
        {"<-"}Назад
      </div>
      <div>
        <h1>Мои данные</h1>
      </div>
      {currentUser?.name && currentUser?.about && (
        <>
          <Form submitForm={handleSubmit(sendProfileData)}>
            <div className="profile__user">
              {/* <div>
          {!isEdit ? (
            <>
              <span>{currentUser.name}</span> iconEdit
            </>
          ) : ( */}
              <input
                {...register("name", reqired)}
                defaultValue={currentUser.name}
                className="auth__input"
                type="text"
                placeholder="Имя"
              />
              <input
                className="auth__input"
                defaultValue={currentUser.about}
                {...register("about", reqired)}
                placeholder="Обо мне"
              />
              <input
                className="auth__input"
                {...register("email")}
                disabled
                defaultValue={currentUser?.email}
                placeholder="Email"
              />
              <input
                className="auth__input"
                {...register("id")}
                disabled
                defaultValue={currentUser?._id}
                placeholder="Id"
              />
              <BaseButton type="submit" color={"pink"}>
                Отправить
              </BaseButton>
              <BaseButton color={"pink"} onClick={handleLogout}>
                Выйти
              </BaseButton>
            </div>
          </Form>

          <div className="profile__avatar">
            <Form submitForm={handleSubmit(sendAvatar)}>
              <div className="profile__user">
                <img
                  className="profile__avatar-img"
                  src={currentUser.avatar}
                  alt=""
                ></img>
                <input
                  className="auth__input"
                  {...register("avatar")}
                  defaultValue={currentUser?.avatar}
                  placeholder="Avatar"
                />
                <BaseButton type="submit" color={"pink"}>
                  Отправить
                </BaseButton>
              </div>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};
