import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const InputNumber = ({
  className,
  onChange,
  value: initialValue = "",
  ...props
}: InputNumberProps) => {
  const [value, setValue] = useState(initialValue);

  const formatWithDots = (value: string) => {
    const digits = value.replace(/\D/g, "");

    return digits
      .split("")
      .reverse()
      .reduce((groups: string[], digit: string, index: number) => {
        if (index % 3 === 0 && index !== 0) {
          groups.unshift(".");
        }
        groups.unshift(digit);
        return groups;
      }, [])
      .join("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatWithDots(inputValue);
    setValue(formattedValue);
  };

  return (
    <Input
      type="text"
      value={formatWithDots(value)}
      placeholder="Nhập số tiền"
      className={className}
      onChange={(e) => {
        onChange?.(e);
        handleChange(e);
      }}
      {...props}
    />
  );
};
