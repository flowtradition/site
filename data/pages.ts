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
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly href: string;
  readonly mainImage: ProductImage;
  readonly options: Option[];
  readonly features: Feature[];
};

export type StoreProduct = {
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

export interface StorePage extends Page {
  readonly heading: string;
  readonly description: string;
  readonly products: StoreProduct[];
}

export interface ProductPage extends Page {
  readonly breadcrumbs: Breadcrumb[];
  readonly images: ProductImage[];
  readonly product: Product;
}

interface PageRepository {
  getIndexPage(): Promise<IndexPage>;
  getStorePage(): Promise<StorePage>;
  getProductPage(slug: string): Promise<ProductPage>;
}

type StrapiImage = {
  alternativeText: string;
  url: string;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
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
  features: StrapiFeatureComponent[];
  options: StrapiOptionComponent[];
};

type StrapiIndexPage = {
  title: string;
  meta_description: string;
  heading: string;
  description: string;
};

type StrapiStorePage = {
  name: string;
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
    const { name } = await this.request.getRequestJson<StrapiStorePage>("store-page");

    return [
      {
        url: "/store",
        title: name,
      },
    ];
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

  async getStorePage(): Promise<StorePage> {
    const { title, meta_description, heading, description } = await this.request.getRequestJson<StrapiStorePage>(
      "store-page"
    );

    const page = {
      title,
      metaDescription: meta_description,
      navigationItems: await this.getNavigationItems(),
    };

    const data = await this.request.getRequestJson<StrapiProduct[]>("products");
    const products = data.map((product) => {
      return {
        id: product.id,
        href: `/store/${product.slug}`,
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
      heading,
      description,
      products,
    };
  }

  async getProductPage(slug: string): Promise<ProductPage> {
    const response = await this.request.getRequestJson<StrapiProduct[]>("products", {
      slug,
    });
    const data = response.shift();

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

    const features = data.features.map(({ name, description }) => {
      return {
        name,
        description,
      };
    });

    const product: Product = {
      slug: data.slug,
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
    const breadcrumbs: Breadcrumb[] = [];
    const images: ProductImage[] = data.images.map((image) => {
      return {
        src: `${this.request.apiUrl}${image.url}`,
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
  getProductSlugs(): Promise<{ product: string }[]>;
}

class StrapiSlugsRepository implements SlugsRepository {
  private readonly request: ApiRequest;

  constructor(request: ApiRequest) {
    this.request = request;
  }

  async getProductSlugs(): Promise<{ product: string }[]> {
    const data = await this.request.getRequestJson<StrapiProduct[]>("products");

    return data.map(({ slug }) => {
      return {
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
