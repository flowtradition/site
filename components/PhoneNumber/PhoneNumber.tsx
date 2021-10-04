import { ChangeEvent } from "react";
import { isPossiblePhoneNumber } from "libphonenumber-js/mobile";

type Props = {
  value: string;
  onChange: (phoneNumber: string) => void;
  onError?: (error: string) => void;
};

export const PhoneNumber = ({ value, onChange, onError }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const phoneNumber = event.target.value.trim();

    if (isPossiblePhoneNumber(phoneNumber)) {
      onChange(phoneNumber);
    } else {
      onError && onError("");
    }
  };

  return (
    <input
      type="text"
      name="phone_number"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder="+7 (977) 789 12 34"
      value={value}
      onChange={handleChange}
    />
  );
};
