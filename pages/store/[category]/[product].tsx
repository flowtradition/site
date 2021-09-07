import { GetStaticPathsContext, GetStaticPropsContext } from "next";

import { Layout } from "../../../components/Layout/Layout";
import { Product } from "../../../components/Product/Product";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addYears } from "date-fns";

export const REFERRAL_COOKIE_NAME = "flowtradition_referral";

const ProductPage = ({ product }) => {
  const [_, setCookie] = useCookies([REFERRAL_COOKIE_NAME]);
  const router = useRouter();
  const { r } = router.query;
  const expires = addYears(new Date(), 1);

  useEffect(() => {
    if (!!r) {
      setCookie(REFERRAL_COOKIE_NAME, r, { path: "/", expires, secure: true, sameSite: "strict" });
    }
  }, [r, setCookie]);

  return (
    <Layout>
      <section className="bg-white">
        <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8 ">
          <Product product={product} />
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;

// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { product: "big-sadhu-set-for-full-body", category: "sadhu-bed-of-nails" }, locale });
    paths.push({ params: { product: "big-sadhu-set-for-the-back", category: "sadhu-bed-of-nails" }, locale });
    paths.push({ params: { product: "classic", category: "sadhu-bed-of-nails" }, locale });
    paths.push({ params: { product: "octahedral", category: "sadhu-bed-of-nails" }, locale });
  }

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ locale, params }: GetStaticPropsContext) {
  const products = {
    en: [
      {
        name: "Classic Sadhu Bed of Nails",
        slug: "classic",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/classic/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/classic/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/classic/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/classic/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Octahedral Sadhu Bed of Nails",
        slug: "octahedral",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/octahedral/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/octahedral/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/octahedral/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/octahedral/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [{ name: "1.4", inStock: true }],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "36×18×4 cm" },
          {
            name: "Step of nails",
            description: "1.4 cm (basic)",
          },
          { name: "Weight", description: "1.7 kg" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Big Sadhu Set for the back",
        slug: "big-sadhu-set-for-the-back",
        price: "$170",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Big Sadhu Set for full body",
        slug: "big-sadhu-set-for-full-body",
        price: "$600",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
    ],
    ru: [
      {
        name: "Классическая доска садху с гвоздями",
        slug: "classic",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Доски садху с гвоздями", href: "#" }],
        images: [
          {
            src: "/content/bed/classic/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/classic/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/classic/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/classic/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Октаэдрическая доска садху с гвоздями",
        slug: "octahedral",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Доски садху с гвоздями", href: "#" }],
        images: [
          {
            src: "/content/bed/octahedral/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/octahedral/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/octahedral/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/octahedral/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [{ name: "1.4", inStock: true }],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "36×18×4 cm" },
          {
            name: "Step of nails",
            description: "1.4 cm (basic)",
          },
          { name: "Weight", description: "1.7 kg" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Big Sadhu Set for the back",
        slug: "big-sadhu-set-for-the-back",
        price: "$170",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-the-back/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
      {
        name: "Big Sadhu Set for full body",
        slug: "big-sadhu-set-for-full-body",
        price: "$600",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        images: [
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/01.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/02.jpeg",
            alt: "Model wearing plain black basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/03.jpeg",
            alt: "Model wearing plain gray basic tee.",
          },
          {
            src: "/content/bed/big-sadhu-set-for-full-body/photos/04.jpeg",
            alt: "Model wearing plain white basic tee.",
          },
        ],
        sizes: [
          { name: "1.2", inStock: true },
          { name: "1.5", inStock: true },
        ],
        description:
          'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        features: [
          { name: "Dimensions", description: "34×14×4 cm" },
          {
            name: "Step of nails",
            description: "1.2 cm (beginner), 1.5 cm (advanced)",
          },
          { name: "Weight", description: "1.5 kg (nail's step 1.2 cm), 1.3 kg (nail's step 1.5cm)" },
          { name: "Materials", description: "Teak wood, stainless zinc nails" },
        ],
      },
    ],
  };

  const product = products[locale].find((product) => product.slug === params.product);

  return {
    props: {
      product,
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
