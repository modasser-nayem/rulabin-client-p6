import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
   useGetSingleCategoryQuery,
   useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi";
import { useEffect } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
   const params = useParams();
   const navigate = useNavigate();
   const categoryId = params?.categoryId;

   const { data: currentCategoryData } = useGetSingleCategoryQuery(
      categoryId as string
   );

   const [updateCategory, { isSuccess, isLoading, error, data }] =
      useUpdateCategoryMutation();

   useEffect(() => {
      if (error) {
         console.log({ error });
         rtqErrorMessageHandle(error);
      }

      if (data) {
         console.log({ data });
         toast.success(data.message);
         navigate("/admin/categories");
      }
   }, [error, data, navigate]);

   const onSubmit: SubmitHandler<FieldValues> = (formData) => {
      const addCategoryData = {
         name: formData.name,
         icon: formData.icon,
      };
      updateCategory({ id: categoryId as string, data: addCategoryData });
   };

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Update Category</h2>
         </div>
         {!currentCategoryData?.data ? (
            <p>Loading...</p>
         ) : (
            <div className="add-category-form">
               <div>
                  <FormWrapper
                     onSubmit={onSubmit}
                     success={isSuccess}
                     defaultValues={
                        currentCategoryData && {
                           name: currentCategoryData?.data.name,
                           icon: currentCategoryData?.data.icon,
                        }
                     }
                  >
                     <InputItem
                        label="name"
                        type="text"
                        name="name"
                        placeholder="Enter category name"
                     />
                     <InputItem
                        label="Icon Link"
                        type="text"
                        name="icon"
                        placeholder="Enter category icon link"
                     />
                     <Button
                        htmlType="submit"
                        className="submit-btn"
                        block
                        loading={isLoading}
                     >
                        Update Category
                     </Button>
                  </FormWrapper>
               </div>
            </div>
         )}
      </div>
   );
};

export default UpdateCategory;
