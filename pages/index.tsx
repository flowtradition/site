import { Layout } from "../components/Layout/Layout";

import { GetStaticPropsContext } from "next";
import Image from "next/image";

import bed from "../public/content/bed/classic/main.jpg";
import carpet from "../public/content/carpet/classic/main.jpg";

const Home = ({ page }) => {
  return (
    <Layout>
      <div className="relative bg-white overflow-hidden">
        <div className="py-12 sm:py-24">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static sm:flex lg:flex-col-reverse">
            <div className="mt-2 sm:mr-10 sm:mt-2 lg:mt-10 ">
              <ul className="flex sm:flex-col lg:flex-row gap-10 mb-10">
                <li className="">
                  <a href="">
                    <Image
                      className="rounded-md max-w-7xl"
                      src={bed}
                      alt="Picture of the author"
                      width={320}
                      height={320}
                    />
                  </a>
                </li>
                <li>
                  <a href="">
                    <Image
                      className="rounded-md max-w-7xl"
                      src={carpet}
                      alt="Picture of the author"
                      width={320}
                      height={320}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">{page.title}</h1>
              <p className="mt-4 text-xl text-gray-500">{page.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  const pages = {
    en: {
      title: "Sadhu",
      description: "desc",
    },
    ru: {
      title: "Уникальные доска и ковер для йоги, которые прослужат вам всю жизнь.",
      description:
        "Уникальные доски и ковер для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями —" +
        " идеальный" +
        " инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а" +
        " также в качестве духовной практики.",
    },
  };

  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../messages/shared/${locale}.json`),
      },
      page: pages[locale],
    },
  };
}
