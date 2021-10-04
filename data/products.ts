export type Feature = {
  readonly name: string;
  readonly description: string;
};

export type ProductImage = {
  readonly src: string;
  readonly alt: string;
};

export type Breadcrumb = {
  readonly id: number;
  readonly href: string;
  readonly name: string;
};

export type Size = {
  readonly name: string;
  readonly inStock: boolean;
};

export type Product = {
  readonly slug: string;
  readonly categorySlug: string;
  readonly name: string;
  readonly price: string;
  readonly href: string;
  readonly mainImage: ProductImage;
  readonly images: ProductImage[];
  readonly sizes: Size[];
  readonly breadcrumbs: Breadcrumb[];
  readonly description: string;
  readonly features: Feature[];
};

export type ProductCategory = {
  readonly id: number;
  readonly name: string;
  readonly href: string;
  readonly mainImage: ProductImage;
  readonly price: string;
};

export interface ProductRepository {
  getProductsForCategory(categorySlug: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product>;
}

export class InMemoryProductRepository implements ProductRepository {
  private readonly lang: string;
  private readonly items: Record<"en" | "ru", Product[]> = {
    en: [
      {
        name: "Classic Sadhu Bed of Nails",
        slug: "classic",
        categorySlug: "sadhu-bed-of-nails",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$170",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$600",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
      {
        name: "Classic Sadhu Carpet of Nails",
        price: "$120",
        slug: "classic",
        categorySlug: "sadhu-carpet-of-nails",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Carpet of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
    ],
    ru: [
      {
        name: "Классическая доска садху с гвоздями",
        slug: "classic",
        categorySlug: "sadhu-bed-of-nails",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Доски садху с гвоздями", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$120",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Доски садху с гвоздями", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$170",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
        categorySlug: "sadhu-bed-of-nails",
        price: "$600",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Bed of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
      {
        name: "Classic Sadhu Carpet of Nails",
        price: "$120",
        slug: "classic",
        categorySlug: "sadhu-carpet-of-nails",
        href: "#",
        breadcrumbs: [{ id: 1, name: "Sadhu Carpet of Nails", href: "#" }],
        mainImage: {
          src: "/content/bed/classic/main.jpg",
          alt: "",
        },
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
    ],
  };

  constructor(lang: string) {
    this.lang = lang;
  }

  getProductBySlug(slug: string): Promise<Product> {
    const product = this.items[this.lang].filter((product) => product.slug === slug);

    return Promise.resolve(product);
  }

  getProductsForCategory(categorySlug: string): Promise<Product[]> {
    const products = this.items[this.lang].filter((product) => product.categorySlug === categorySlug);

    return Promise.resolve(products);
  }
}
