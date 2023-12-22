import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, h as renderComponent, m as maybeRenderHead, u as unescapeHTML } from '../astro_RShKOa8Z.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import contenful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/saadchowdhary/local/FM-Manager/src/layouts/Layout.astro", void 0);

const contentfulClient = contenful.createClient({
  space: "w5t66j2mii78",
  accessToken: "kZWsEt-AYPf_tSjS96W06TTojCQss1UxTvoQuxBURJc",
  host: "cdn.contentful.com"
});

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  let post;
  const { slug } = Astro2.params;
  try {
    const data = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.slug": slug
    });
    const { content, title, date } = data.items[0].fields;
    post = {
      title,
      date: new Date(date).toLocaleDateString(),
      content: documentToHtmlString(content)
    };
  } catch (error) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": post?.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>${post?.title}</h1> <time>${post?.date}</time> <article>${unescapeHTML(post?.content)}</article> </main> ` })}`;
}, "/Users/saadchowdhary/local/FM-Manager/src/pages/posts/[slug].astro", void 0);

const $$file = "/Users/saadchowdhary/local/FM-Manager/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _slug_ as _, contentfulClient as c };
