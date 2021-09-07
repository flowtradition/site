import { GetStaticPathsContext, GetStaticPropsContext } from "next";

import { Layout } from "../../../components/Layout/Layout";
import { Product } from "../../../components/Product/Product";

const ProductPage = ({ product }) => (
  <Layout>
    <section className="bg-white">
      <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8 ">
        <Product product={product} />
      </div>
    </section>
  </Layout>
);

export default ProductPage;

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { slug: "classic", category: "sadhu-carpet-of-nails" }, locale });
  }

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  const products = {
    en: {
      name: "Classic Sadhu Carpet of Nails",
      price: "$120",
      href: "#",
      breadcrumbs: [{ id: 1, name: "Sadhu Carpet of Nails", href: "#" }],
      images: [
        {
          src: "/content/carpet/01.jpg",
          alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
          src: "/content/carpet/02.jpg",
          alt: "Model wearing plain black basic tee.",
        },
        {
          src: "/content/carpet/03.jpg",
          alt: "Model wearing plain gray basic tee.",
        },
        {
          src: "/content/carpet/04.jpg",
          alt: "Model wearing plain white basic tee.",
        },
      ],
      sizes: [
        { name: "1.0", inStock: true },
        { name: "1.2", inStock: true },
        { name: "1.5", inStock: true },
      ],
      description:
        "Ковер легко сложить и взять с собой. Конструкция позволяет скатать его в компактный рулон. Сверху расположена ручка для удобства переноса. ",
      features: [
        { name: "Dimensions", description: "80×40 cm" },
        {
          name: "Step of nails",
          description: "1.0 cm (beginner), 1.2 cm (basic), 1.5 cm (advanced)",
        },
        { name: "Weight", description: "2.3 kg" },
        { name: "Materials", description: "Teak wood, stainless zinc nails" },
      ],
    },
    ru: {
      name: "Classic Sadhu Carpet of Nails",
      price: "$120",
      href: "#",
      breadcrumbs: [{ id: 1, name: "Sadhu Carpet of Nails", href: "#" }],
      images: [
        {
          src: "/content/carpet/IMG_3664.jpg",
          alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
          src: "/content/carpet/IMG_3682.jpg",
          alt: "Model wearing plain black basic tee.",
        },
        {
          src: "/content/carpet/IMG_3706.jpg",
          alt: "Model wearing plain gray basic tee.",
        },
        {
          src: "/content/carpet/IMG_3747.jpg",
          alt: "Model wearing plain white basic tee.",
        },
      ],
      sizes: [
        { name: "1.0", inStock: true },
        { name: "1.2", inStock: true },
        { name: "1.5", inStock: true },
      ],
      description:
        "Ковер легко сложить и взять с собой. Конструкция позволяет скатать его в компактный рулон. Сверху расположена ручка для удобства переноса. ",
      features: [
        { name: "Dimensions", description: "80×40 cm" },
        {
          name: "Step of nails",
          description: "1.0 cm (beginner), 1.2 cm (basic), 1.5 cm (advanced)",
        },
        { name: "Weight", description: "2.3 kg" },
        { name: "Materials", description: "Teak wood, stainless zinc nails" },
      ],
    },
  };

  return {
    props: {
      product: products[locale],
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
