import Cookies from "js-cookie";
const REFERRAL_COOKIE_NAME = "flowtradition_referral";

export const setReferral = (referral: string | null) => {
  if (referral !== null) {
    Cookies.set(REFERRAL_COOKIE_NAME, referral, { expires: 365, secure: true, sameSite: "strict" });
  }
};

export const getReferral = (): string | null => {
  return Cookies.get(REFERRAL_COOKIE_NAME) ?? null;
};
