import source from './source/staging/blogs-index.json';

export interface BlogArticleSummary {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage: string;
  sourceUrl: string;
}

export interface BlogArticle extends BlogArticleSummary {
  images: string[];
  content: string;
}

export const blogArticles = source.articles as BlogArticleSummary[];
const articleFiles = import.meta.glob<{ default: BlogArticle }>('./source/staging/blog-articles/*.json');

export const loadBlogArticle = async (slug: string) => {
  const loader = articleFiles[`./source/staging/blog-articles/${slug}.json`];
  return loader ? (await loader()).default : null;
};

export const articleCategory = (article: BlogArticleSummary) => {
  const text = `${article.title} ${article.excerpt}`.toLowerCase();
  if (/mortgage|loan|broker/.test(text)) return 'Mortgage & loans';
  if (/financial plan|bookkeep|accounting|finances/.test(text)) return 'Finance';
  if (/real estate|property/.test(text)) return 'Real estate';
  if (/marketing|social media/.test(text)) return 'Marketing';
  if (/burnout|ceo|growth|business/.test(text)) return 'Business growth';
  return 'Virtual assistance';
};

export const formatArticleDate = (date: string) => new Intl.DateTimeFormat('en-AU', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney',
}).format(new Date(date));
