import Link from "next/link";
import { useRouter } from "next/router";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales.filter((locale) => locale !== activeLocale);

  return (
    <ul>
      {otherLocales.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <li key={locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                <img src={`/images/${locale}.svg`} alt="" className="w-5 h-auto block flex-shrink-0" />
                <span className="ml-3 block text-sm font-medium uppercase">{locale}</span>
                <span className="sr-only">, изменить язык</span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
