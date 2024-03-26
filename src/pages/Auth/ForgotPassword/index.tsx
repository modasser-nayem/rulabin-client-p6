import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import "./style.css";
import { useEffect } from "react";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { toast } from "sonner";

const ForgotPassword = () => {
   const [forgotPassword, { error, data, isLoading, isSuccess }] =
      useForgotPasswordMutation();

   useEffect(() => {
      if (error) {
         console.log({ error });
         rtqErrorMessageHandle(error);
      }

      if (data) {
         console.log({ data });
         toast.success(data.message);
      }
   }, [error, data]);

   const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
      const newData = {
         email: formData.email,
      };
      forgotPassword(newData);
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
               <p>Forgot Password</p>
            </div>
            <FormWrapper
               onSubmit={onSubmit}
               success={isSuccess}
            >
               <InputItem
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
               />
               <Button
                  htmlType="submit"
                  className="submit-btn"
                  block
                  loading={isLoading}
               >
                  Submit Email
               </Button>
            </FormWrapper>
         </div>
      </Row>
   );
};

export default ForgotPassword;
