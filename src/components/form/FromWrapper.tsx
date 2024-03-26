import { Form } from "antd";
import { ReactNode } from "react";
import {
   FieldValues,
   FormProvider,
   SubmitHandler,
   useForm,
} from "react-hook-form";

type TFormConfig = {
   defaultValues?: Record<string, unknown>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   resolver?: any;
};

type TFormWrapperProps = {
   children: ReactNode;
   onSubmit: SubmitHandler<FieldValues>;
   success?: boolean;
} & TFormConfig;

const FormWrapper = ({
   children,
   onSubmit,
   defaultValues,
   resolver,
   success,
}: TFormWrapperProps) => {
   const formConfig: TFormConfig = {};

   if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
   }

   if (resolver) {
      formConfig["resolver"] = resolver;
   }

   const methods = useForm(formConfig);

   const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
      onSubmit(data);
      if (success) {
         methods.reset();
      }
   };

   return (
      <FormProvider {...methods}>
         <Form
            layout="vertical"
            onFinish={methods.handleSubmit(onSubmitHandler)}
         >
            {children}
         </Form>
      </FormProvider>
   );
};

export default FormWrapper;
