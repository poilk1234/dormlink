import { useState } from 'react';

/* Custom hook tailored for user registration and editing */
export default function useFormFields(init) {
  /* Allows for initial state to be passed in */
  const [fieldsFilled, setFieldsFilled] = useState(init);

  /* Handles change according to different type of MUI form input */
  function handleChange(event) {
    const { name, value } = event.target;
    fieldsFilled[name] = value;
    setFieldsFilled({ ...fieldsFilled });
    // console.log(fieldsFilled);
  }

  return [fieldsFilled, handleChange];
}
