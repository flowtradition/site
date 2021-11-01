/* Vendor */
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

/* Components */
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

/* Utils */
import { StrapiApiRequest, StrapiPageRepository, StrapiSlugsRepository } from "@/data/pages";

/* Types */
import type { CategoryPage as CategoryPageType } from "@/data/pages";
import { Alert } from "@/components/Alert/Alert";

type Props = {
  page: CategoryPageType;
  preview?: boolean;
};

const CategoryPage = ({ page, preview }: Props) => {
  const router = useRouter();
  const t = useTranslations("Shared");
  const { isFallback } = router;

  if (isFallback) {
    return t("Loading...");
  }

  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      {preview && (
        <div className="p-4">
          <Alert
            title="Включен режим предпросмотра"
            link={{
              href: "/api/exit-preview",
              text: "Нажмите сюда, чтобы выйти",
            }}
          />
        </div>
      )}
      <Header navigationItems={page.navigationItems} />
      <main className="container mx-auto">
        <section className="bg-white">
          <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center mb-4">
              {page.heading}
            </h1>
            <p className="max-w-2xl mb-12 mx-auto text-center text-gray-600">{page.description}</p>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {page.categoryProducts.map((product) => (
                <div key={product.href} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={product.href}>
                          <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CategoryPage;

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
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
    const slugs = await repository.getCategorySlugs();

    slugs.forEach((slug) => paths.push({ params: { category: slug }, locale }));
  }

  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ locale, params, preview }: GetStaticPropsContext) {
  const request = new StrapiApiRequest({
    apiUrl,
    locale,
    token,
  });
  const pages = new StrapiPageRepository(request);

  const slug = params.category as string;
  const page = await pages.getCategoryPage(slug);

  return {
    props: {
      page,
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../../messages/shared/${locale}.json`),
      },
      preview: preview ?? false,
    },
  };
}
