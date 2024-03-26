import { Button, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../components/form/FromWrapper";
import InputItem from "../../../components/form/InputItem";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useLoginUserMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hook";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../../redux/features/auth/authSlice";
import { TAuthUser } from "../../../types/user.types";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";

const Login = () => {
   const defaultValues = {
      email: "user1@gmail.com",
      password: "123456",
   };

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [loginMutation, { error, data, isSuccess, isLoading }] =
      useLoginUserMutation();

   useEffect(() => {
      if (error) {
         console.log({ error });
         rtqErrorMessageHandle(error);
      }

      if (data) {
         console.log({ data });
         toast.success(data.message);
         const token = data.data.access_token;
         const decodeUser = jwtDecode(token) as TAuthUser;
         dispatch(loginUser({ token: token, user: decodeUser }));
         navigate(`/${decodeUser.role}`);
      }
   }, [error, data, dispatch, navigate]);

   const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
      console.log(formData);
      const loginUserData = {
         email: formData.email,
         password: formData.password,
      };
      loginMutation(loginUserData);
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
               <p>Login your account</p>
            </div>
            <FormWrapper
               defaultValues={defaultValues}
               onSubmit={onSubmit}
               success={isSuccess}
            >
               <InputItem
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
               />
               <InputItem
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
               />
               <Button
                  htmlType="submit"
                  className="submit-btn"
                  block
                  loading={isLoading}
               >
                  Login
               </Button>
               <p className="form-bottom">
                  <Link to="/forgot-password">Forgot Password?</Link>
               </p>
               <Divider plain>or</Divider>
               <p className="form-bottom">
                  Don't have any account?{" "}
                  <Link to="/register">Register here</Link>
               </p>
            </FormWrapper>
         </div>
      </Row>
   );
};

export default Login;
