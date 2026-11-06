import source from './source/staging/blogs-index.json';

export interface BlogArticleSummary {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  /* Null for the older articles, which carry their picture inline or have none. */
  featuredImage: string | null;
  sourceUrl: string;
  /* The category suggested in docs/wordpress-integration/post-categories-suggested.csv, 4 November 2026,
     awaiting VA Paola's approval. */
  category?: string;
}

export interface BlogArticle extends BlogArticleSummary {
  images: string[];
  content: string;
}

/* Two source images were saved to disk under truncated filenames; point their references at the saved files. */
const savedImageNames: Record<string, string> = {
  '/assets/source/staging/blog-images/193692c904-AD_4nXcHgvRixWSMGG0WOPUY8EqUghxpmpjtaW4XnDZFP0JfyAZjTvF9NaAZygIk1sXSbIVWJN8kA1cK5JCVgHHngRRIfT_rahkYjnxpbfIl9p9CCQKrWL01oNMysBLDvWToX7VtF2.png':
    '/assets/source/staging/blog-images/193692c904-AD_4nXcHgvRixWSMGG0WOPUY8EqUghxpmpjtaW4XnDZFP0JfyAZjTvF9NaAZygIk1sXSbIVWJN8kA1cK5JCVg.png',
  '/assets/source/staging/blog-images/6f2e1a37f8-AD_4nXd8kCaf3Aw5F4KrDTSEHVRGU1rrlmdKSEcfVq30ZvvKIze14i-vVMCYBVUGh8z5FQ4eKbgk-NR2EdnVTJGFaojxYAU87yJI3LTLZ7JHLrbkhVRmuTQm4M2ivw25MFEAt3imVqOhMiPhg4abMI7.png':
    '/assets/source/staging/blog-images/6f2e1a37f8-AD_4nXd8kCaf3Aw5F4KrDTSEHVRGU1rrlmdKSEcfVq30ZvvKIze14i-vVMCYBVUGh8z5FQ4eKbgk-NR2EdnVT.png',
};
const savedImage = (path: string | null) => (path && savedImageNames[path]) ?? path;
const withSavedImages = (text: string) => Object.entries(savedImageNames).reduce((out, [from, to]) => out.split(from).join(to), text);

export const blogArticles = (source.articles as BlogArticleSummary[]).map((article) => ({ ...article, featuredImage: savedImage(article.featuredImage) }));

/* News & Community is its own menu item (VA Paola, 6 November 2026): company updates and events, kept
   apart from the articles written for search. The articles keep their /insights/{slug} addresses. */
export const NEWS_CATEGORY = 'News & Community';
export const newsArticles = blogArticles.filter((article) => article.category === NEWS_CATEGORY);
export const insightArticles = blogArticles.filter((article) => article.category !== NEWS_CATEGORY);

/* How the Insights topic filter is laid out: the two columns of its dropdown, as in the Services menu. */
export const articleTopicGroups = [
  { label: 'By service', topics: ['Mortgage & Loans', 'Financial Planning', 'Accounting & Bookkeeping', 'Real Estate', 'Digital Marketing'] },
  { label: 'By topic', topics: ['All insights', 'Hiring a Virtual Assistant', 'Specialised Virtual Assistants', 'Leadership & Delegation', 'Business Growth'] },
] as const;

const articleFiles = import.meta.glob<{ default: BlogArticle }>('./source/staging/blog-articles/*.json');

export const loadBlogArticle = async (slug: string) => {
  const loader = articleFiles[`./source/staging/blog-articles/${slug}.json`];
  if (!loader) return null;
  const article = (await loader()).default;
  const category = blogArticles.find((item) => item.slug === slug)?.category;
  return { ...article, category, featuredImage: savedImage(article.featuredImage), images: article.images.flatMap((image) => savedImage(image) ?? []), content: withSavedImages(article.content) };
};

/* The live site's category where the article has one; otherwise one worked out from its words, since
   the older articles have none. */
export const articleCategory = (article: BlogArticleSummary) => {
  if (article.category) return article.category;
  const text = `${article.title} ${article.excerpt}`.toLowerCase();
  if (/mortgage|loan|broker/.test(text)) return 'Mortgage & loans';
  if (/financial plan|bookkeep|accounting|finances/.test(text)) return 'Finance';
  if (/real estate|property/.test(text)) return 'Real estate';
  if (/marketing|social media/.test(text)) return 'Marketing';
  if (/burnout|ceo|growth|business/.test(text)) return 'Business growth';
  return 'Virtual assistance';
};

/* Nine older articles have no picture on the live site or staging, so their cards borrow a general
   photo by category. Only the cards do: an article page shows no picture rather than a stock one that
   could be taken for the people in the story. */
const cardFallbacks: Record<string, string> = {
  [NEWS_CATEGORY]: '/assets/client/extra/team-celebrating-agreement.jpg',
  'Leadership & Delegation': '/assets/client/extra/team-laptop-review.jpg',
  'Hiring a Virtual Assistant': '/assets/source/staging/images/13e3afc0dd-2796.jpg',
};
export const articleCardImage = (article: BlogArticleSummary) => article.featuredImage
  ?? cardFallbacks[article.category ?? ''] ?? '/assets/client/extra/team-project-laptop.jpg';

export const formatArticleDate = (date: string) => new Intl.DateTimeFormat('en-AU', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney',
}).format(new Date(date));
