import { useState } from 'react';

export const useForm = (validate, submit) => {
  const [errors, setErrors] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    console.log("form", form)
    const entries = Array.from(new FormData(form).entries());
    console.log("entries", entries)
    const errors = entries.map(([key, val]) => [key, validate(key, val)]);
    errors.forEach(([key, val]) => { form[key].setCustomValidity(val) });

    if (errors.some(([key, val]) => val !== '')) {
      setErrors(Object.fromEntries(errors));
    } else {
      setErrors(null);
      submit(Object.fromEntries(entries));
    }
  }

  return [errors, handleSubmit];
}