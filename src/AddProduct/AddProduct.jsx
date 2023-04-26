import "./index.scss";

export const AddProduct = ({ setCreateModal }) => {
  return (
    <div className="create-product">
      это продукт
      <div>
        <span onClick={() => setCreateModal(false)}>x</span>
      </div>
    </div>
  );
};
