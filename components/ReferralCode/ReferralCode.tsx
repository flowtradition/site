import { ChangeEvent } from "react";

export const ReferralCode = ({ value, onChange, isExists }) => {
  if (isExists) {
    return <input type="text" name="referralCode" className="hidden" defaultValue={value} />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const code = event.target.value;

    onChange(code);
  };

  return (
    <label className="block mb-4">
      <span className="text-gray-700">Referral code</span>
      <input
        type="text"
        name="referralCode"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Where are you come from?"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};
