import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Layout } from "@/components/Layout/Layout";
import { categories, Category, InMemoryCategoriesRepository } from "../../data/categories";
import { InMemoryProductRepository, ProductCategory } from "../../data/products";
import { Header } from "@/components/Header/Header";

type Props = { products: Product[]; category: Category };

const CategoryPage = ({ products, category }: Props) => {
  const router = useRouter();
  const t = useTranslations("Shared");
  const { isFallback } = router;

  if (isFallback) {
    return t("Loading...");
  }

  return (
    <Layout>
      <Header />
      <main className="container mx-auto">
        <section className="bg-white">
          <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center mb-4">
              {category.title}
            </h1>
            <p className="max-w-2xl mb-12 mx-auto text-center text-gray-600">{category.description}</p>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.slug} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={product.mainImage.src}
                      alt={product.mainImage.alt}
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

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = [];

  for (const locale of locales) {
    const repository = new InMemoryCategoriesRepository(locale);
    const slugs = await repository.getSlugs();

    slugs.forEach((slug) => paths.push({ params: { category: slug }, locale }));
  }

  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
  const productsRepository = new InMemoryProductRepository(locale);

  const categorySlug = params.category as string;
  const products = await productsRepository.getProductsForCategory(categorySlug);
  const categoriesRepository = new InMemoryCategoriesRepository(locale);
  const category = await categoriesRepository.getCategoryBySlug(categorySlug);

  console.log(category);

  return {
    props: {
      products,
      category,
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../../messages/shared/${locale}.json`),
      },
    },
  };
}
