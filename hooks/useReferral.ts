import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { addYears } from "date-fns";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const REFERRAL_NAME = "flowtradition_referral";

export const useReferral = (): {
  referral: string | null;
} => {
  const [referral, setReferral] = useLocalStorage(REFERRAL_NAME, "");
  const router = useRouter();
  const { r } = router.query;

  useEffect(() => {
    setCookie(REFERRAL_NAME, r, { path: "/", expires, secure: true, sameSite: "strict" });
  }, [r, setCookie]);

  return cookies[REFERRAL_NAME] ?? null;
};
