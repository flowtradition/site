import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { classNames } from "../../utils/classNames";
import { ReferralCode } from "../ReferralCode/ReferralCode";
import { REFERRAL_COOKIE_NAME } from "../../pages/store/[category]/[product]";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

export const Product = ({ product }) => {
  const t = useTranslations("Product");

  const [cookies] = useCookies([REFERRAL_COOKIE_NAME]);

  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isExists, setIsExists] = useState<boolean>(true);
  const [referralCode, setReferralCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (event): void => {
    event.preventDefault();
  };

  const isDisabled = false;

  useEffect(() => {
    const referralCode = cookies[REFERRAL_COOKIE_NAME];

    setReferralCode(referralCode ?? "");
    setIsExists(!!referralCode);
  }, [cookies]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <p className="font-medium text-gray-500">{product.name}</p>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-16 lg:px-8 lg:grid lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-2">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{product.price}</p>

            <form className="mt-10" onSubmit={handleSubmit} noValidate>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Step of nails (cm):</h3>
              </div>

              <RadioGroup value={selectedSize} onChange={setSelectedSize} className="my-4">
                <RadioGroup.Label className="sr-only">Choose a step of nails</RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {product.sizes.map((size) => (
                    <RadioGroup.Option
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={({ active }) =>
                        classNames(
                          size.inStock
                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                          active ? "ring-2 ring-indigo-500" : "",
                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                          {size.inStock ? (
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked ? "border-indigo-500" : "border-transparent",
                                "absolute -inset-px rounded-md pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                            >
                              <svg
                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </div>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <label className="block mb-4">
                <span className="text-gray-700">Full Name:</span>
                <input
                  type="text"
                  name="fullName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="John Doe"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  maxLength={80}
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Email address:</span>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Phone Number:</span>
                <input
                  type="text"
                  name="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="+7 (977) 789 12 34"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </label>

              <ReferralCode isExists={isExists} value={referralCode} onChange={setReferralCode} />

              <label className="block mb-4">
                <span className="text-gray-700">Address:</span>
                <textarea
                  name="address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  spellCheck="false"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>

              <button
                type="submit"
                disabled={isDisabled}
                className={classNames(
                  "mt-10 w-full border border-transparent rounded-md py-3 px-8 flex items-center",
                  "justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                  isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                )}
              >
                {t("Buy")}
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-8 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{t("Specifications")}</h2>

              <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {product.features.map((feature) => (
                  <div key={feature.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">{feature.name}</dt>
                    <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
