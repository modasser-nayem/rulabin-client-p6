import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAddBrandMutation } from "../../../redux/features/Brand/brandApi";

const AddBrand = () => {
   const navigate = useNavigate();
   const [addNewBrand, { isSuccess, isLoading, error, data }] =
      useAddBrandMutation();

   useEffect(() => {
      if (error) {
         rtqErrorMessageHandle(error);
      }

      if (data) {
         toast.success(data.message);
         navigate("/admin/brand");
      }
   }, [error, data, navigate]);

   const onSubmit: SubmitHandler<FieldValues> = (formData) => {
      const addBrandData = {
         name: formData.name,
         icon: formData.icon,
      };
      addNewBrand(addBrandData);
   };

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Add Brand</h2>
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
                     placeholder="Enter brand name"
                  />
                  <InputItem
                     label="Icon Link"
                     type="text"
                     name="icon"
                     placeholder="Enter brand icon link"
                  />
                  <Button
                     htmlType="submit"
                     className="submit-btn"
                     block
                     loading={isLoading}
                  >
                     Add Brand
                  </Button>
               </FormWrapper>
            </div>
         </div>
      </div>
   );
};

export default AddBrand;
