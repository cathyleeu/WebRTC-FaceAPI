import { useState, ChangeEvent } from 'react';

function validatePhone(value: string) {
  let phoneReg = /^[(]{0,1}[0-9]{11}$/;
  var digits = value.replace(/-*\D/g, "");
  return phoneReg.test(digits);
}

export function format(number: string) {
  return number.replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
}

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return {
    attrs: {
      value,
      onChange
    },
    setValue
  }
}

const usePhoneInput = (initialValue: string = '') => {
  const input = useInput(format(initialValue));
  const [isValidate, setValidate] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    input.setValue(format(e.target.value));
    setValidate(validatePhone(e.target.value));
    setStatusMessage('');
  }
  return {
    attrs: {
      ...input.attrs,
      onChange
    },
    setValue: input.setValue,
    isValidate,
    setValidate,
    statusMessage,
    setStatusMessage
  }
}

export default useInput;
export { usePhoneInput };