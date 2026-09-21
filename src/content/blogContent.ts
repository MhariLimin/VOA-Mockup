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

/* Two source images were saved to disk under truncated filenames; point their references at the saved files. */
const savedImageNames: Record<string, string> = {
  '/assets/source/staging/blog-images/193692c904-AD_4nXcHgvRixWSMGG0WOPUY8EqUghxpmpjtaW4XnDZFP0JfyAZjTvF9NaAZygIk1sXSbIVWJN8kA1cK5JCVgHHngRRIfT_rahkYjnxpbfIl9p9CCQKrWL01oNMysBLDvWToX7VtF2.png':
    '/assets/source/staging/blog-images/193692c904-AD_4nXcHgvRixWSMGG0WOPUY8EqUghxpmpjtaW4XnDZFP0JfyAZjTvF9NaAZygIk1sXSbIVWJN8kA1cK5JCVg.png',
  '/assets/source/staging/blog-images/6f2e1a37f8-AD_4nXd8kCaf3Aw5F4KrDTSEHVRGU1rrlmdKSEcfVq30ZvvKIze14i-vVMCYBVUGh8z5FQ4eKbgk-NR2EdnVTJGFaojxYAU87yJI3LTLZ7JHLrbkhVRmuTQm4M2ivw25MFEAt3imVqOhMiPhg4abMI7.png':
    '/assets/source/staging/blog-images/6f2e1a37f8-AD_4nXd8kCaf3Aw5F4KrDTSEHVRGU1rrlmdKSEcfVq30ZvvKIze14i-vVMCYBVUGh8z5FQ4eKbgk-NR2EdnVT.png',
};
const savedImage = (path: string) => savedImageNames[path] ?? path;
const withSavedImages = (text: string) => Object.entries(savedImageNames).reduce((out, [from, to]) => out.split(from).join(to), text);

export const blogArticles = (source.articles as BlogArticleSummary[]).map((article) => ({ ...article, featuredImage: savedImage(article.featuredImage) }));
const articleFiles = import.meta.glob<{ default: BlogArticle }>('./source/staging/blog-articles/*.json');

export const loadBlogArticle = async (slug: string) => {
  const loader = articleFiles[`./source/staging/blog-articles/${slug}.json`];
  if (!loader) return null;
  const article = (await loader()).default;
  return { ...article, featuredImage: savedImage(article.featuredImage), images: article.images.map(savedImage), content: withSavedImages(article.content) };
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
