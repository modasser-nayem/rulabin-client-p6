import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
   TResetPasswordData,
   useResetPasswordMutation,
} from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";

const ResetPassword = () => {
   const navigate = useNavigate();
   const urlParams = new URLSearchParams(window.location.search);

   const [resetPassword, { error, data, isSuccess, isLoading }] =
      useResetPasswordMutation();

   useEffect(() => {
      if (error) {
         console.log({ error });
         rtqErrorMessageHandle(error);
      }

      if (data) {
         console.log({ data });
         toast.success(data.message);
         navigate("/login");
      }
   }, [error, data, navigate]);

   const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
      const id = urlParams.get("id") || "";
      const token = urlParams.get("token") || "";

      const resetPasswordData: TResetPasswordData = {
         data: {
            userId: id,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
         },
         token: token,
      };
      resetPassword(resetPasswordData);
   };

   return (
      <Row
         justify="center"
         align="middle"
         style={{ height: "100vh" }}
      >
         <div className="main-form">
            <div className="from-header">
               <h3>Rulabin</h3>
               <p>Reset Password</p>
            </div>
            <FormWrapper
               onSubmit={onSubmit}
               success={isSuccess}
            >
               <InputItem
                  label="New Password"
                  type="text"
                  name="newPassword"
                  placeholder="Enter new password"
               />
               <InputItem
                  label="Confirm Password"
                  type="text"
                  name="confirmPassword"
                  placeholder="Retype password"
               />
               <Button
                  htmlType="submit"
                  className="submit-btn"
                  block
                  loading={isLoading}
               >
                  Reset Password
               </Button>
            </FormWrapper>
         </div>
      </Row>
   );
};

export default ResetPassword;
