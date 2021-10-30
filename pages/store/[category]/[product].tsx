/* Vendor */
import { useState } from "react";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

/* Components */
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Option } from "@/components/Option/Option";
import { ReferralCode } from "@/components/ReferralCode";

/* Utils */
import { classNames } from "@/utils/class-names";
import { StrapiApiRequest, StrapiPageRepository, StrapiSlugsRepository } from "@/data/pages";

/* Types */
import type { ProductPage as ProductPageType } from "@/data/pages";
import { useReferralCode } from "@/hooks/useReferralCode";

type Props = {
  page: ProductPageType;
};

const ProductPage = ({ page }: Props) => {
  const t = useTranslations("Product");

  const referralCode = useReferralCode();
  const [price, setPrice] = useState(page.product.price);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    referralCode,
  });
  const [selectedOptions, setSelectedOptions] = useState(() =>
    page.product.options.reduce((prevOption, nextOption) => {
      // const key = nextOption.id; // with id
      const key = nextOption.name; // with name

      return {
        ...prevOption,
        // [key]: nextOption.values[0].id, // with id
        [key]: nextOption.values[0].name, // with name
      };
    }, {})
  );

  // console.log(selectedOptions);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleOptionChange = ({ id, name, value }) => {
    if (value.price) {
      setPrice(value.price);
    }
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        // [id]: value.id, // with id
        [name]: value.name, // with name
      };
    });
  };

  const handleSubmit = (event): void => {
    event.preventDefault();
    console.log(formData, selectedOptions);
  };

  const isDisabled = false;

  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Header navigationItems={page.navigationItems} />
      <main className="container mx-auto">
        <section className="bg-white">
          <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8 ">
            <div className="bg-white">
              <div className="pt-6">
                <nav aria-label="Breadcrumb">
                  <ol
                    role="list"
                    className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
                  >
                    {page.breadcrumbs.map((breadcrumb) => (
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
                      <p className="font-medium text-gray-500">{page.product.name}</p>
                    </li>
                  </ol>
                </nav>

                {/* Image gallery */}
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                    <img
                      src={page.images[0].src}
                      alt={page.images[0].alt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img
                        src={page.images[1].src}
                        alt={page.images[1].alt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                      <img
                        src={page.images[2].src}
                        alt={page.images[2].alt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                    <img
                      src={page.images[3].src}
                      alt={page.images[3].alt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-16 lg:px-8 lg:grid lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                      {page.product.name}
                    </h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-2">
                    <h2 className="sr-only">{t("Product Information")}</h2>
                    <p className="text-3xl text-gray-900">
                      {price} {t("Currency")}
                    </p>

                    <form className="mt-10" onSubmit={handleSubmit} noValidate>
                      {page.product.options.map((option) => (
                        <Option
                          key={option.id}
                          id={option.id}
                          name={option.name}
                          values={option.values}
                          onChange={handleOptionChange}
                        />
                      ))}

                      <label className="block mb-4">
                        <span className="text-gray-700">{t("Full Name")}:</span>
                        <input
                          type="text"
                          name="fullName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="John Doe"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          maxLength={80}
                        />
                      </label>

                      <label className="block mb-4">
                        <span className="text-gray-700">{t("E-mail Address")}:</span>
                        <input
                          type="email"
                          name="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="email@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </label>

                      <label className="block mb-4">
                        <span className="text-gray-700">{t("Phone Number")}:</span>
                        <input
                          type="text"
                          name="phoneNumber"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="+7 (977) 789 12 34"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </label>

                      <div className={`${referralCode ? "hidden" : ""}`}>
                        <ReferralCode value={formData.referralCode} onChange={handleChange} />
                      </div>

                      <label className="block mb-4">
                        <span className="text-gray-700">{t("Delivery Address")}:</span>
                        <textarea
                          name="deliveryAddress"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          rows={3}
                          spellCheck="false"
                          required
                          value={formData.deliveryAddress}
                          onChange={handleChange}
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
                      <h3 className="sr-only">{t("Specifications")}</h3>

                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{page.product.description}</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                        {t("Specifications")}
                      </h2>

                      <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {page.product.features.map((feature) => (
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
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ProductPage;

const apiUrl = process.env.API_URL;
const token = process.env.STRAPI_STATIC_TOKEN;

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = [];

  for (const locale of locales) {
    const request = new StrapiApiRequest({
      apiUrl,
      locale,
      token,
    });
    const repository = new StrapiSlugsRepository(request);
    const slugs = await repository.getProductSlugs();

    slugs.forEach(({ category, product }) => {
      paths.push({ params: { product, category }, locale });
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
  const request = new StrapiApiRequest({
    apiUrl,
    locale,
    token,
  });
  const pages = new StrapiPageRepository(request);

  const slug = params.product as string;
  const page = await pages.getProductPage(slug);

  return {
    props: {
      page,
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../../../messages/shared/${locale}.json`),
        ...require(`../../../messages/store/product/${locale}.json`),
      },
    },
  };
}
