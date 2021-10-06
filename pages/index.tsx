/* Vendor */
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

/* Components */
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

/* Utils */
import { InMemoryPageRepository } from "@/data/pages";
import { InMemoryCategoriesRepository } from "@/data/categories";

/* Types */
import type { IndexPage } from "@/data/pages";
import type { Category, CategoryNavItem } from "@/data/categories";

type Props = {
  page: IndexPage;
  categories: Category[];
  navigation: CategoryNavItem[];
};

const Index = ({ page, categories, navigation }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Header navigation={navigation} />
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
                          className="rounded-md max-w-7xl cursor-pointer"
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

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const pagesRepository = new InMemoryPageRepository(locale);
  const page = await pagesRepository.getIndexPage();
  const categoriesRepository = new InMemoryCategoriesRepository(locale);
  const categories = await categoriesRepository.getForIndexPage();
  const navigation = await categoriesRepository.getNavigationItems();

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
      navigation,
    },
  };
}
