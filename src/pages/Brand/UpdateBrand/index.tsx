import { Button } from "antd";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
   useGetSingleBrandQuery,
   useUpdateBrandMutation,
} from "../../../redux/features/Brand/brandApi";

const UpdateBrand = () => {
   const params = useParams();
   const navigate = useNavigate();
   const brandId = params?.brandId;

   const { data: currentBrandData } = useGetSingleBrandQuery(brandId as string);

   const [updateBrand, { isSuccess, isLoading, error, data }] =
      useUpdateBrandMutation();

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
      const updateBrandData = {
         name: formData.name,
         icon: formData.icon,
      };
      updateBrand({ id: brandId as string, data: updateBrandData });
   };

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Update Brand</h2>
         </div>
         {!currentBrandData?.data ? (
            <p>Loading...</p>
         ) : (
            <div className="add-category-form">
               <div>
                  <FormWrapper
                     onSubmit={onSubmit}
                     success={isSuccess}
                     defaultValues={{
                        name: currentBrandData?.data.name,
                        icon: currentBrandData?.data.icon,
                     }}
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
                        Update Brand
                     </Button>
                  </FormWrapper>
               </div>
            </div>
         )}
      </div>
   );
};

export default UpdateBrand;
