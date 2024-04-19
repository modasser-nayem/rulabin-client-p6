import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryApi";
import { useEffect } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
   const navigate = useNavigate();
   const [addNewCategory, { isSuccess, isLoading, error, data }] =
      useAddCategoryMutation();

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
      addNewCategory(addCategoryData);
   };

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Add Category</h2>
         </div>
         <div className="add-category-form">
            <div>
               <FormWrapper
                  onSubmit={onSubmit}
                  success={isSuccess}
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
                     Add Category
                  </Button>
               </FormWrapper>
            </div>
         </div>
      </div>
   );
};

export default AddCategory;
