import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

export const ReferralCode = ({ value, onChange, isExists }) => {
  const t = useTranslations("Product");
  if (isExists) {
    return <input type="text" name="referralCode" className="hidden" defaultValue={value} />;
  }

  return (
    <label className="block mb-4">
      <span className="text-gray-700">{t("Referral Code")}</span>
      <input
        type="text"
        name="referralCode"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={t("Where are you come from?") as string}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
