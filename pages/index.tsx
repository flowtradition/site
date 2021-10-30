/* Vendor */
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

/* Components */
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";

/* Utils */
import { StrapiApiRequest, StrapiPageRepository } from "@/data/pages";

/* Types */
import type { IndexPage } from "@/data/pages";

type Props = {
  page: IndexPage;
};

const HomePage = ({ page }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
      </Head>
      <Header navigationItems={page.navigationItems} />
      <main className="container mx-auto">
        <div className="relative bg-white overflow-hidden">
          <div className="py-12 sm:py-24">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static sm:flex lg:flex-col-reverse">
              <div className="mt-2 sm:mr-10 sm:mt-2 lg:mt-10 ">
                <ul className="flex sm:flex-col lg:flex-row gap-10 mb-10">
                  {page.featuredItems.map((featuredItem) => (
                    <li key={featuredItem.url}>
                      <Link href={featuredItem.url} passHref>
                        <Image
                          className="rounded-md max-w-7xl cursor-pointer"
                          src={featuredItem.image.src}
                          alt={featuredItem.image.alt}
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

export default HomePage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const apiUrl = process.env.API_URL;
  const token = process.env.STRAPI_STATIC_TOKEN;
  const request = new StrapiApiRequest({
    apiUrl,
    locale,
    token,
  });
  const pages = new StrapiPageRepository(request);
  const page = await pages.getIndexPage();

  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: {
        ...require(`../messages/shared/${locale}.json`),
      },
      page,
    },
  };
}
