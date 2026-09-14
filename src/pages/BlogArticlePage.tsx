import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleCategory, blogArticles, formatArticleDate, loadBlogArticle, type BlogArticle } from '../content/blogContent';
import { NotFoundPage } from './NotFoundPage';

export function BlogArticlePage() {
  const { slug } = useParams();
  const summary = blogArticles.find((item) => item.slug === slug);
  const [article, setArticle] = useState<BlogArticle | null>();

  useEffect(() => {
    let current = true;
    setArticle(undefined);
    if (slug) loadBlogArticle(slug).then((value) => { if (current) setArticle(value); });
    return () => { current = false; };
  }, [slug]);

  if (!summary) return <NotFoundPage />;
  if (!article) return <div className="l2-article-loading"><div className="container narrow">Loading article…</div></div>;

  const index = blogArticles.indexOf(summary);
  const previous = blogArticles[(index - 1 + blogArticles.length) % blogArticles.length];
  const next = blogArticles[(index + 1) % blogArticles.length];

  return <article className="l2-article">
    <header className="l2-article-header"><div className="container narrow l2-article-heading"><Link className="article-back" to="/insights">← All insights</Link><p className="eyebrow">{articleCategory(article)}</p><h1>{article.title}</h1><div className="blog-meta"><span>{formatArticleDate(article.date)}</span><span>By {article.author}</span></div></div></header>
    <figure className="container l2-article-featured"><img src={article.featuredImage} alt="" /></figure>
    <section className="l2-article-body"><div className="container narrow article-content" dangerouslySetInnerHTML={{ __html: article.content }} /></section>
    <nav className="l2-article-navigation" aria-label="More articles"><div className="container"><Link to={`/insights/${previous.slug}`}><small>Previous article</small><strong>{previous.title}</strong><span>←</span></Link><Link to={`/insights/${next.slug}`}><small>Next article</small><strong>{next.title}</strong><span>→</span></Link></div></nav>
  </article>;
}
