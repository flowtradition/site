import bed from "../public/content/bed/classic/main.jpg";
import carpet from "../public/content/carpet/classic/main.jpg";

export const categories = {
  en: {
    heading: "Best Sadhu Bed of Nails",
    description:
      "Уникальные доски для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями — идеальный\n          инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а\n          также в качестве духовной практики.",
  },
  ru: {
    heading: "Лучшие доски садху с гвоздями",
    description:
      "Уникальные доски для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями — идеальный\n          инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а\n          также в качестве духовной практики.",
  },
};

type CategoryNavItem = {
  readonly slug: string;
  readonly name: string;
};

export type Category = {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly image: {
    src: string | StaticImageData;
    alt: string;
  };
};

interface CategoriesRepository {
  getNavigationItems(): Promise<CategoryNavItem[]>;
  getCategoryBySlug(slug: string): Promise<Category>;
  getSlugs(): Promise<string[]>;
  getForIndexPage(): Promise<Category>;
}

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private readonly lang: string;
  private readonly items: Record<"en" | "ru", Category[]> = {
    en: [
      {
        slug: "sadhu-bed-of-nails",
        name: "Sadhu Bed of Nails",
        title: "Best Sadhu Bed of Nails",
        description: "Best Sadhu Bed of Nails description",
        image: {
          src: bed,
          alt: "",
        },
      },
      {
        slug: "sadhu-carpet-of-nails",
        name: "Sadhu Carpet of Nails",
        title: "Best Sadhu Carpet of Nails",
        description: "Best Sadhu Carpet of Nails description",
        image: {
          src: carpet,
          alt: "",
        },
      },
      {
        slug: "others",
        name: "Others",
        title: "Others",
        description: "Others description",
        image: {
          src: "",
          alt: "",
        },
      },
    ],
    ru: [
      {
        slug: "sadhu-bed-of-nails",
        name: "Доски садху с гвоздями",
        title: "Лучшие доски садху с гвоздями",
        description:
          "Уникальные доски для поверхности спины, крестца и шеи. Терапевтическая садху-доска с гвоздями — идеальный инструмент для глубокого расслабления, при болях в плечах и пояснице, интенсивных физических нагрузках, а также в качестве духовной практики.",
        image: {
          src: bed,
          alt: "",
        },
      },
      {
        slug: "sadhu-carpet-of-nails",
        name: "Sadhu Carpet of Nails",
        title: "Лучшие ковры садху с гвоздями",
        description: "Уникальные ковры, описание",
        image: {
          src: carpet,
          alt: "",
        },
      },
      {
        slug: "others",
        name: "Разное",
        title: "Разное заголовок",
        description: "Разное описание",
        image: {
          src: "",
          alt: "",
        },
      },
    ],
  };

  constructor(lang: string) {
    this.lang = lang;
  }

  getSlugs(): Promise<string[]> {
    return Promise.resolve(this.items[this.lang].map((category) => category.slug));
  }

  getCategoryBySlug(slug: string): Promise<Category> {
    const category = this.items[this.lang].filter((category) => category.slug === slug).shift();

    return Promise.resolve(category);
  }

  getNavigationItems(): Promise<CategoryNavItem[]> {
    const navItems = this.items[this.lang].map((category) => ({
      slug: category.slug,
      name: category.name,
    }));

    return Promise.resolve(navItems);
  }

  getForIndexPage(): Promise<Category> {
    const slugs = ["sadhu-bed-of-nails", "sadhu-carpet-of-nails"];
    const categories = this.items[this.lang].filter((category) => slugs.includes(category.slug));

    return Promise.resolve(categories);
  }
}
