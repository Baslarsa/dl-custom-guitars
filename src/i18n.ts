import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
// TODO: Update this object with your website's supported locales. Keys
// should be the locale IDs registered in your Prismic repository, and values
// should be the string that appears in the URL.
const LOCALES = {
  "en-us": "en",
  fi: "fi",
};

/** Creates a redirect with an auto-detected locale prepended to the URL. */
export function createLocaleRedirect(request: NextRequest): Response {
  const headers = {
    "accept-language": request.headers.get("accept-language"),
  } as Record<string, string>;

  const languages = new Negotiator({ headers }).languages();
  const locales = Object.keys(LOCALES);
  const locale = match(languages, locales, locales[0]);

  // @ts-expect-error out of control
  request.nextUrl.pathname = `/${LOCALES[locale]}${request.nextUrl.pathname}`;

  return Response.redirect(request.nextUrl);
}

/** Determines if a pathname has a locale as its first segment. */
export function pathnameHasLocale(request: NextRequest): boolean {
  const regexp = new RegExp(`^/(${Object.values(LOCALES).join("|")})(\/|$)`);

  return regexp.test(request.nextUrl.pathname);
}

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string): string | undefined {
  for (const key in LOCALES) {
    // @ts-expect-error out of control
    if (LOCALES[key] === locale) {
      return key;
    }
  }
}
