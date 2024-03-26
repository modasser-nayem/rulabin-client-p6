import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormWrapper from "../../components/form/FromWrapper";
import InputItem from "../../components/form/InputItem";
import "./style.css";

const ForgotPassword = () => {
   const defaultValues = {
      email: "modassernayem@gmail.com",
   };

   const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
      console.log(formData);
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
               defaultValues={defaultValues}
               onSubmit={onSubmit}
            >
               <InputItem
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Enter your id"
               />
               <Button
                  htmlType="submit"
                  className="submit-btn"
                  block
               >
                  Submit Email
               </Button>
            </FormWrapper>
         </div>
      </Row>
   );
};

export default ForgotPassword;
