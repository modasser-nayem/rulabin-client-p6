import { Form } from "antd";
import Input from "antd/es/input/Input";
import { Controller } from "react-hook-form";
import { Typography } from "antd";
const { Text } = Typography;
import "./style.css";

type TInputItemProps = {
   label: string;
   type: string;
   name: string;
   placeholder?: string;
};

const InputItem = ({ label, type, name, placeholder }: TInputItemProps) => {
   return (
      <Controller
         render={({ field, fieldState: { error } }) => (
            <Form.Item
               {...(error ? { validateStatus: "error" } : {})}
               help={error?.message}
               label={label}
               className="input-item-label"
            >
               <Input
                  {...field}
                  type={type}
                  id={name}
                  placeholder={placeholder}
                  size="large"
                  // {...(error ? { status: "error" } : {})}
                  className="input-item"
               />
               {error && <Text type="danger">{error.message}</Text>}
            </Form.Item>
         )}
         name={name}
      />
   );
};

export default InputItem;
