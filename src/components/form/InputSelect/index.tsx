import { Form, Select, Typography } from "antd";
import { Controller } from "react-hook-form";
import "./style.css";

const { Text } = Typography;

type TInputSelectProps = {
   label: string;
   name: string;
   mode?: "multiple" | "tags" | undefined;
   options?:
      | {
           value: string;
           label: string;
           disabled?: boolean;
        }[]
      | undefined;
   defaultValue?: string | string[];
   placeholder?: string;
   disabled?: boolean;
};

const InputSelect = ({
   label,
   name,
   mode,
   options,
   defaultValue,
   placeholder,
   disabled,
}: TInputSelectProps) => {
   return (
      <Controller
         render={({ field, fieldState: { error } }) => (
            <Form.Item
               label={label}
               className="input-item-label"
            >
               <Select
                  {...field}
                  mode={mode}
                  defaultValue={defaultValue}
                  options={options}
                  placeholder={placeholder}
                  size="large"
                  disabled={disabled}
                  {...(error ? { status: "error" } : {})}
                  className="select-input-item"
               />
               {error && <Text type="danger">{error.message}</Text>}
            </Form.Item>
         )}
         name={name}
      />
   );
};

export default InputSelect;
