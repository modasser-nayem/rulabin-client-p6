import { Button, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useRegisterUserMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";

const Register = () => {
   const navigate = useNavigate();
   const [registerUser, { isLoading, isSuccess, error, data }] =
      useRegisterUserMutation();

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
      const newRegisterData = {
         name: formData.name,
         email: formData.email,
         password: formData.password,
         confirmPassword: formData.confirmPassword,
      };
      registerUser(newRegisterData);
   };

   return (
      <Row
         justify="center"
         align="middle"
         style={{ minHeight: "100vh", margin: "80px 0" }}
      >
         <div className="main-form">
            <div className="from-header">
               <h3>Rulabin</h3>
               <p>Register new account</p>
            </div>
            <FormWrapper
               onSubmit={onSubmit}
               success={isSuccess}
            >
               <InputItem
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
               />
               <InputItem
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
               />
               <InputItem
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
               />
               <InputItem
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype password"
               />
               <Button
                  loading={isLoading}
                  htmlType="submit"
                  className="submit-btn"
                  block
               >
                  Register
               </Button>
               <Divider plain>or</Divider>
               <p className="bottom-header">
                  Already have an account? <Link to="/login">Login here</Link>
               </p>
            </FormWrapper>
         </div>
      </Row>
   );
};

export default Register;
