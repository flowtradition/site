import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { addYears } from "date-fns";

const REFERRAL_COOKIE_NAME = "flowtradition_referral";

export const useReferral = (): {
  referral: string | null;
} => {
  const [cookies, setCookie] = useCookies([REFERRAL_COOKIE_NAME]);
  const router = useRouter();
  const { r } = router.query;
  const expires = addYears(new Date(), 1);

  useEffect(() => {
    setCookie(REFERRAL_COOKIE_NAME, r, { path: "/", expires, secure: true, sameSite: "strict" });
  }, [r, setCookie]);

  return cookies[REFERRAL_COOKIE_NAME] ?? null;
};
