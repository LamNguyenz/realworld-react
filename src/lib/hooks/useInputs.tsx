import { useState } from "react";

type DefaultType = Record<string, any>;

type ReturnTypes = [
  any,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<DefaultType>>,
];

const useInputs = (initialForm: DefaultType): ReturnTypes => {
  const [values, setValues] = useState(initialForm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return [values, onChange, setValues];
};

export default useInputs;
