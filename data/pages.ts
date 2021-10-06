export interface Page {
  readonly title: string;
  readonly metaDescription: string;
}

export interface IndexPage extends Page {
  readonly heading: string;
  readonly description: string;
}

export interface CategoryPage extends Page {
  readonly heading: string;
  readonly description: string;
}

export interface ProductPage extends Page {
  readonly heading: string;
  readonly description: string;
}

interface PageRepository {
  getIndexPage(): Promise<IndexPage>;
  getCategoryPage(): Promise<CategoryPage>;
  getProductPage(): Promise<ProductPage>;
}

export class InMemoryPageRepository implements PageRepository {
  private readonly lang: string;

  constructor(lang: string) {
    this.lang = lang;
  }

  getCategoryPage(): Promise<CategoryPage> {
    throw new Error("Method not implemented.");
  }
  getProductPage(): Promise<ProductPage> {
    throw new Error("Method not implemented.");
  }

  getIndexPage(): Promise<IndexPage> {
    const index = {
      en: {
        title: "Flowtradition",
        metaDescription: "Flowtradition meta",
        heading: "Уникальные доска и ковер для йоги, которые прослужат вам всю жизнь.",
        description:
          "Уникальные доски и ковер для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями —" +
          " идеальный" +
          " инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а" +
          " также в качестве духовной практики.",
      },
      ru: {
        title: "Flowtradition",
        metaDescription: "Flowtradition meta",
        heading: "Уникальные доска и ковер для йоги, которые прослужат вам всю жизнь.",
        description:
          "Уникальные доски и ковер для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями —" +
          " идеальный" +
          " инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а" +
          " также в качестве духовной практики.",
      },
    };

    return Promise.resolve(index[this.lang]);
  }
}
