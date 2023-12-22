import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, h as renderComponent } from '../astro_RShKOa8Z.mjs';
import 'kleur/colors';
import 'clsx';
import { c as contentfulClient, $ as $$Layout } from './_slug__wzA0jbWt.mjs';
/* empty css                          */
/* empty css                          */

const $$Astro$1 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const { href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="link-card" data-astro-cid-dohjnao5> <a${addAttribute(href, "href")} data-astro-cid-dohjnao5> <h2 data-astro-cid-dohjnao5> ${title} <span data-astro-cid-dohjnao5>&rarr;</span> </h2> <p data-astro-cid-dohjnao5> ${body} </p> </a> </li> `;
}, "/Users/saadchowdhary/local/FM-Manager/src/components/Card.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const entries = await contentfulClient.getEntries({
    content_type: "blogPost"
  });
  const posts = entries.items.map((item) => {
    const { title, date, description, slug } = item.fields;
    return {
      title,
      slug,
      description,
      date: new Date(date).toLocaleDateString()
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>
Welcome to <span class="text-gradient">Football Manager Companion App</span> </h1> <p class="instructions">
To get started, click on create squad<br> </p> <ul role="list" class="link-card-grid"> ${renderComponent($$result2, "Card", $$Card, { "href": "#", "title": "Create Squad", "body": "Create a new squad" })} </ul> <ul role="list" class="link-card-grid"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "href": `/posts/${post.slug}/`, "title": post.title, "body": "" })}`)} </ul> </main> ` })}`;
}, "/Users/saadchowdhary/local/FM-Manager/src/pages/index.astro", void 0);

const $$file = "/Users/saadchowdhary/local/FM-Manager/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
