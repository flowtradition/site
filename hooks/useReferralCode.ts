import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

const REFERRAL_CODE_KEY = "flowtradition_referral_code";

export const useReferralCode = (key = REFERRAL_CODE_KEY, initialValue = "") => {
  const { query } = useRouter();
  const { r } = query;
  const [referralCode, setReferralCode] = useLocalStorage<string>(key, initialValue);

  useEffect(() => {
    if (referralCode) {
      return;
    }

    if (typeof r !== "undefined") {
      setReferralCode(r as string);
    }
  }, [r]);

  return referralCode;
};
