import { InputHTMLAttributes, useState } from "react";
import { ButtonMinus, ButtonPlus, Input, InputNumberContainer } from "./style";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement>{
  defaultValue?: number;
  getValue?: (value: number) => void;
}

export function InputNumber({ min, getValue, defaultValue, ...props }: InputNumberProps) {
  const [value, setValue] = useState(defaultValue || 0);

  const handleDecrement = () => {
    const hasMin = typeof min != "undefined";
    
    if (hasMin)
      if (value <= Number(min)) 
        return;
    
    setValue(old => {
      const newValue = old -1;
      getValue && getValue(newValue);
      
      return newValue;
    });    
  }

  const handleIncrement = () => {
    setValue(old => {
      const newValue = old + 1;
      getValue && getValue(newValue);

      return newValue;
    });
  }

  return (
    <InputNumberContainer>
      <ButtonMinus onClick={handleDecrement}>-</ButtonMinus>
      <Input 
        type="number" 
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        {...props}
      />
      <ButtonPlus onClick={handleIncrement}>+</ButtonPlus>
    </InputNumberContainer>
  )
}