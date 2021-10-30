import qs from "qs";

export type Feature = {
  readonly name: string;
  readonly description: string;
};

export type Value = {
  id: number;
  name: string;
  inStock: boolean;
  price?: number;
  description?: string;
};

export type Option = {
  id: number;
  name: string;
  values: Value[];
};

export type Breadcrumb = {
  readonly id: number;
  readonly href: string;
  readonly name: string;
};

export type ProductImage = {
  readonly src: string;
  readonly alt: string;
};

export type Product = {
  readonly slug: string;
  readonly categorySlug: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly href: string;
  readonly mainImage: ProductImage;
  readonly options: Option[];
  readonly features: Feature[];
};

export type ProductCategory = {
  readonly id: number;
  readonly name: string;
  readonly href: string;
  readonly image: ProductImage;
  readonly price: number;
};

export type BaseImage = {
  src: string;
  alt: string;
};

export type NavItem = {
  readonly url: string;
  readonly title: string;
};

export interface Page {
  readonly title: string;
  readonly metaDescription: string;
  readonly navigationItems: NavItem[];
}

export type FeaturedItem = {
  readonly image: BaseImage;
  readonly url: string;
};

export interface IndexPage extends Page {
  readonly heading: string;
  readonly description: string;
  readonly featuredItems: FeaturedItem[];
}

export interface CategoryPage extends Page {
  readonly heading: string;
  readonly description: string;
  readonly categoryProducts: ProductCategory[];
}

export interface ProductPage extends Page {
  readonly breadcrumbs: Breadcrumb[];
  readonly images: ProductImage[];
  readonly product: Product;
}

interface PageRepository {
  getIndexPage(): Promise<IndexPage>;
  getCategoryPage(slug: string): Promise<CategoryPage>;
  getProductPage(slug: string): Promise<ProductPage>;
}

type StrapiImage = {
  alternativeText: string;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
};

type StrapiCategory = {
  title: string;
  meta_description: string;
  slug: string;
  name: string;
  description: string;
  image: StrapiImage;
  heading: string;
};

type StrapiPartner = {
  name: string;
  code: string;
};

type StrapiFeatureComponent = {
  id: number;
  name: string;
  description: string;
};

type StrapiValueComponent = {
  id: number;
  name: string;
  in_stock: boolean;
  price?: number;
  description?: string;
};

type StrapiOptionComponent = {
  id: number;
  name: string;
  values: StrapiValueComponent[];
};

type StrapiProduct = {
  id: number;
  title: string;
  meta_description: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  main_image: StrapiImage;
  images: StrapiImage[];
  category: StrapiCategory;
  features: StrapiFeatureComponent[];
  options: StrapiOptionComponent[];
};

type StrapiIndexPage = {
  title: string;
  meta_description: string;
  heading: string;
  description: string;
};

export class StrapiPageRepository implements PageRepository {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  private async getNavigationItems(): Promise<NavItem[]> {
    const data = await this.request.getRequestJson<StrapiCategory[]>("categories");

    return data.map((item) => {
      return {
        url: `/store/${item.slug}`,
        title: item.name,
      };
    });
  }

  async getIndexPage(): Promise<IndexPage> {
    const { title, meta_description, heading, description } = await this.request.getRequestJson<StrapiIndexPage>(
      "index-page"
    );

    const page = {
      title,
      metaDescription: meta_description,
      navigationItems: await this.getNavigationItems(),
    };

    return {
      ...page,
      heading,
      description,
      featuredItems: [],
    };
  }

  async getCategoryPage(slug: string): Promise<CategoryPage> {
    const response = await this.request.getRequestJson<StrapiCategory[]>("categories", {
      slug,
    });
    const data = response.shift();

    const page = {
      title: data.title,
      metaDescription: data.meta_description,
      navigationItems: await this.getNavigationItems(),
    };

    const products = await this.request.getRequestJson<StrapiProduct[]>("products", {
      _where: {
        "category.slug": slug,
      },
    });
    const categoryProducts = products.map((product) => {
      return {
        id: product.id,
        href: `/store/${slug}/${product.slug}`,
        name: product.name,
        image: {
          src: `${this.request.apiUrl}${product.main_image.formats.small.url}`,
          alt: product.main_image.alternativeText,
        },
        price: product.price,
      };
    });

    return {
      ...page,
      heading: data.heading,
      description: data.description,
      categoryProducts,
    };
  }

  async getProductPage(slug: string): Promise<ProductPage> {
    const response = await this.request.getRequestJson<StrapiProduct[]>("products", {
      slug,
    });
    const data = response.shift();

    data.options.map((option) => console.log(option));

    const { title, meta_description } = data;
    const page = {
      title: title,
      metaDescription: meta_description,
      navigationItems: await this.getNavigationItems(),
    };

    const options = data.options.map((option) => {
      return {
        id: option.id,
        name: option.name,
        values: option.values.map((value) => {
          return {
            id: value.id,
            name: value.name,
            inStock: value.in_stock,
            price: value.price,
            description: value.description,
          };
        }),
      };
    });

    const features = data.features.map((feature) => {
      return {
        name: feature.name,
        description: feature.description,
      };
    });

    const product: Product = {
      slug: data.slug,
      categorySlug: data.category.slug,
      name: data.name,
      description: data.description,
      price: data.price,
      href: "",
      mainImage: {
        src: `${this.request.apiUrl}${data.main_image.formats.small.url}`,
        alt: data.main_image.alternativeText,
      },
      options,
      features,
    };
    // console.log(product);
    const breadcrumbs: Breadcrumb[] = [];
    const images: ProductImage[] = data.images.map((image) => {
      return {
        src: `${this.request.apiUrl}${image.formats.medium.url}`,
        alt: image.alternativeText,
      };
    });

    return {
      ...page,
      breadcrumbs,
      images,
      product,
    };
  }
}

interface SlugsRepository {
  getCategorySlugs(): Promise<string[]>;
  getProductSlugs(): Promise<{ category: string; product: string }[]>;
}

class StrapiSlugsRepository implements SlugsRepository {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  async getCategorySlugs(): Promise<string[]> {
    const data = await this.request.getRequestJson<StrapiCategory[]>("categories");

    return data.map((item) => item.slug);
  }

  async getProductSlugs(): Promise<{ category: string; product: string }[]> {
    const data = await this.request.getRequestJson<StrapiProduct[]>("products");

    return data.map(({ slug, category }) => {
      return {
        category: category.slug,
        product: slug,
      };
    });
  }
}

export { StrapiSlugsRepository };

interface ApiRequest {
  readonly apiUrl: string;
  getRequestJson<TResponse, TQuery = Record<string, any>>(slug: string, additionalQuery?: TQuery): Promise<TResponse>;
}

class StrapiApiRequest implements ApiRequest {
  readonly apiUrl: string;
  private readonly locale: string;
  private readonly token: string;

  constructor({ apiUrl, locale, token }) {
    this.apiUrl = apiUrl;
    this.locale = locale;
    this.token = token;
  }

  async getRequestJson<TResponse, TQuery = Record<string, any>>(
    slug: string,
    additionalQuery?: TQuery
  ): Promise<TResponse> {
    const query = qs.stringify({
      token: this.token,
      _locale: this.locale,
      ...additionalQuery,
    });
    const response = await fetch(`${this.apiUrl}/${slug}/?${query}`);

    return response.json();
  }
}

export { StrapiApiRequest };
