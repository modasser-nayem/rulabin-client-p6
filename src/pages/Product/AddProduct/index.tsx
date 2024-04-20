import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../redux/features/products/productApi";
import InputSelect from "../../../components/form/InputSelect";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { useGetAllBrandQuery } from "../../../redux/features/Brand/brandApi";
import { useAppSelector } from "../../../redux/hook";

const AddProduct = () => {
   const navigate = useNavigate();

   const userRole = useAppSelector((state) => state.auth.user?.role);

   const { data: allCategories } = useGetAllCategoryQuery(undefined);
   const { data: allBrands } = useGetAllBrandQuery(undefined);

   const categoryOptions = allCategories?.data.map((item) => ({
      label: item.name,
      value: item._id,
   }));

   const brandOptions = allBrands?.data.map((item) => ({
      label: item.name,
      value: item._id,
   }));

   const [addNewProduct, { isSuccess, isLoading, error, data }] =
      useAddProductMutation();

   useEffect(() => {
      if (error) {
         rtqErrorMessageHandle(error);
      }

      if (data) {
         toast.success(data.message);
         navigate(`/${userRole}/products`);
      }
   }, [error, data, navigate, userRole]);

   const onSubmit: SubmitHandler<FieldValues> = (formData) => {
      const addProductData = {
         title: formData.title,
         model: formData.model,
         price: Number(formData.price),
         quantity: Number(formData.quantity),
         image: formData.image,
         description: formData.description,
         brand: formData.brand,
         category: formData.category,
      };
      addNewProduct(addProductData);
   };

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Add New Product</h2>
         </div>
         <div className="add-category-form">
            <div>
               <FormWrapper
                  onSubmit={onSubmit}
                  success={isSuccess}
               >
                  <InputItem
                     label="Title"
                     type="text"
                     name="title"
                     placeholder="Enter title"
                  />
                  <InputItem
                     label="Model"
                     type="text"
                     name="model"
                     placeholder="Enter model"
                  />
                  <InputItem
                     label="Price"
                     type="number"
                     name="price"
                     placeholder="Enter price"
                  />
                  <InputItem
                     label="Quantity"
                     type="number"
                     name="quantity"
                     placeholder="Enter quantity"
                  />
                  <InputSelect
                     label="Brand"
                     name="brand"
                     options={brandOptions && brandOptions}
                  />
                  <InputSelect
                     label="Category"
                     name="category"
                     options={categoryOptions && categoryOptions}
                  />
                  <InputItem
                     label="Image"
                     type="text"
                     name="image"
                     placeholder="Enter image"
                  />
                  <InputItem
                     label="Description"
                     type="text"
                     name="description"
                     placeholder="Enter description"
                  />
                  <Button
                     htmlType="submit"
                     className="submit-btn"
                     block
                     loading={isLoading}
                  >
                     Add Product
                  </Button>
               </FormWrapper>
            </div>
         </div>
      </div>
   );
};

export default AddProduct;
