import { Layout } from "@/components/Layout/Layout";

import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header/Header";
import { IndexPage, InMemoryPageRepository } from "../data/pages";
import { Category, InMemoryCategoriesRepository } from "../data/categories";

const Home = ({ page, categories }: { page: IndexPage; categories: Category[] }) => {
  return (
    <Layout>
      <Header />
      <main className="container mx-auto">
        <div className="relative bg-white overflow-hidden">
          <div className="py-12 sm:py-24">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static sm:flex lg:flex-col-reverse">
              <div className="mt-2 sm:mr-10 sm:mt-2 lg:mt-10 ">
                <ul className="flex sm:flex-col lg:flex-row gap-10 mb-10">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/store/${category.slug}`} passHref>
                        <Image
                          className="rounded-md max-w-7xl"
                          src={category.image.src}
                          alt={category.image.alt}
                          width={320}
                          height={320}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  {page.heading}
                </h1>
                <p className="mt-4 text-xl text-gray-500">{page.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const pagesRepository = new InMemoryPageRepository(locale);
  const page = await pagesRepository.getIndexPage();
  const categoriesRepository = new InMemoryCategoriesRepository(locale);
  const categories = await categoriesRepository.getForIndexPage();

  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../messages/shared/${locale}.json`),
      },
      page,
      categories,
    },
  };
}
