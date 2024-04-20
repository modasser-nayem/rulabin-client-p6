import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
   useGetSingleProductQuery,
   useUpdateProductMutation,
} from "../../../redux/features/products/productApi";
import { useAppSelector } from "../../../redux/hook";
import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import { useGetAllBrandQuery } from "../../../redux/features/Brand/brandApi";
import InputSelect from "../../../components/form/InputSelect";

const UpdateProduct = () => {
   const { productId } = useParams();
   const navigate = useNavigate();

   const { data: currentProductData } = useGetSingleProductQuery(
      productId as string
   );

   const userRole = useAppSelector((state) => state.auth.user?.role);

   const { data: allCategories } = useGetAllCategoryQuery(undefined);
   const { data: allBrands } = useGetAllBrandQuery(undefined);

   const categoryOptions = useMemo(() => {
      return allCategories?.data.map((item) => ({
         label: item.name,
         value: item._id,
      }));
   }, [allCategories]);

   const brandOptions = useMemo(() => {
      return allBrands?.data.map((item) => ({
         label: item.name,
         value: item._id,
      }));
   }, [allBrands]);

   const [
      updateProduct,
      {
         isSuccess: updateProductIsSuccess,
         isLoading: updateProductIsLoading,
         error: updateProductError,
         data: updateProductData,
      },
   ] = useUpdateProductMutation();

   useEffect(() => {
      if (updateProductError) {
         rtqErrorMessageHandle(updateProductError);
      }

      if (updateProductData) {
         toast.success(updateProductData.message);
         navigate(`/${userRole}/products`);
      }
   }, [updateProductError, updateProductData, navigate, userRole]);

   const onSubmit: SubmitHandler<FieldValues> = (formData) => {
      const updateProductData = {
         title: formData.title,
         model: formData.model,
         price: Number(formData.price),
         quantity: Number(formData.quantity),
         image: formData.image,
         description: formData.description,
         brand: formData.brand,
         category: formData.category,
      };
      updateProduct({ id: productId as string, data: updateProductData });
      console.log(updateProductData);
   };

   let defaultProductValue;
   if (currentProductData?.data) {
      const productFetchData = currentProductData.data;
      defaultProductValue = {
         title: productFetchData.title,
         model: productFetchData.model,
         price: productFetchData.price,
         quantity: productFetchData.quantity,
         brand: productFetchData.brand._id,
         category: productFetchData.category._id,
         image: productFetchData.image,
         description: productFetchData.description,
      };
   }

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Update Product</h2>
         </div>
         <div className="add-category-form">
            {!currentProductData?.data ? (
               <p>Loading...</p>
            ) : (
               <div>
                  <FormWrapper
                     onSubmit={onSubmit}
                     success={updateProductIsSuccess}
                     defaultValues={defaultProductValue}
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
                        loading={updateProductIsLoading}
                     >
                        Update Product
                     </Button>
                  </FormWrapper>
               </div>
            )}
         </div>
      </div>
   );
};

export default UpdateProduct;
