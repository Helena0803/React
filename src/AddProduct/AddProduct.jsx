import { useForm } from "react-hook-form";
import "./index.scss";
import { Form } from "../Form/Form";
import { BaseButton } from "../BaseButton/BaseBatton";
import { api } from "../Utils/Api";

export const AddProduct = ({ setCreateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const addProduct = async (data) => {
    console.log({ data });
    try {
      await api.addNewProduct(data);
    } catch (error) {}
  };

  return (
    <div className="create-product">
      <span onClick={() => setCreateModal(false)}>x</span>
      <div>
        <Form title={"Добавить товар"} submitForm={handleSubmit(addProduct)}>
          <input
            type="text"
            className="auth__input"
            placeholder="Название"
            {...register("name", { required: true })}
          />
          <input
            type="number"
            className="auth__input"
            placeholder="Цена"
            {...register("price", { required: true })}
          />
          <input
            type="text"
            className="auth__input"
            placeholder="Описание"
            {...register("description")}
          />
          <input
            type="text"
            className="auth__input"
            placeholder="picture"
            {...register("pictures", { required: true })}
          />
          {/* <input
            type="text"
            className="auth__input"
            placeholder="Тэги"
            {...register("tags")}
          /> */}
          <BaseButton color={"pink"} type="submit">
            Добавить
          </BaseButton>
        </Form>
      </div>
    </div>
  );
};
