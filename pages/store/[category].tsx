import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { Layout } from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { categories } from "../../api/categories";

const Category = ({ products, category }) => {
  const router = useRouter();
  const t = useTranslations("Shared");
  const { isFallback } = router;

  if (isFallback) {
    return t("Loading...");
  }

  return (
    <Layout>
      <section className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center mb-4">
            {category.heading}
          </h1>

          <p className="max-w-2xl mb-12 mx-auto text-center text-gray-600">{category.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
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
    </Layout>
  );
};

export default Category;

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { category: "sadhu-bed-of-nails" }, locale });
    paths.push({ params: { category: "sadhu-carpet-of-nails" }, locale });
  }

  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export function getStaticProps({ locale }: GetStaticPropsContext) {
  const products = {
    en: [
      {
        id: 1,
        name: "Classic Sadhu Bed of Nails",
        href: "/store/sadhu-bed-of-nails/classic",
        imageSrc: "/content/bed/classic/main.jpg",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$120",
      },
      {
        id: 2,
        name: "Octahedral Sadhu Bed of Nails",
        href: "/store/sadhu-bed-of-nails/octahedral",
        imageSrc: "/content/bed/octahedral/main.jpg",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$120",
      },
      {
        id: 3,
        name: "Big Sadhu Set for the back",
        href: "/store/sadhu-bed-of-nails/big-sadhu-set-for-the-back",
        imageSrc: "/content/bed/big-sadhu-set-for-the-back/main.jpg",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$170",
      },
      {
        id: 4,
        name: "Big Sadhu Set for full body",
        href: "/store/sadhu-bed-of-nails/big-sadhu-set-for-full-body",
        imageSrc: "/content/bed/big-sadhu-set-for-full-body/main.jpg",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "$600",
      },
    ],
    ru: [
      {
        id: 1,
        name: "Классическая доска",
        href: "/store/sadhu-bed-of-nails/classic",
        imageSrc: "/content/bed/classic/main.jpg",
        imageAlt: "Классическая доска",
        price: "$120",
      },
      {
        id: 2,
        name: "Октаэдрическая доска",
        href: "/store/sadhu-bed-of-nails/octahedral",
        imageSrc: "/content/bed/octahedral/main.jpg",
        imageAlt: "Октаэдрическая доска",
        price: "$120",
      },
      {
        id: 3,
        name: "Большой набор для спины",
        href: "/store/sadhu-bed-of-nails/big-sadhu-set-for-the-back",
        imageSrc: "/content/bed/big-sadhu-set-for-the-back/main.jpg",
        imageAlt: "Большой набор для спины",
        price: "$170",
      },
      {
        id: 4,
        name: "Большой набор для всего тела",
        href: "/store/sadhu-bed-of-nails/big-sadhu-set-for-full-body",
        imageSrc: "/content/bed/big-sadhu-set-for-full-body/main.jpg",
        imageAlt: "Большой набор для всего тела",
        price: "$600",
      },
    ],
  };

  return {
    props: {
      products: products[locale],
      category: categories[locale],
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../../messages/shared/${locale}.json`),
      },
    },
  };
}
