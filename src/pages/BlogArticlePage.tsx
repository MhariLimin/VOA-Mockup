import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  articleCategory,
  blogArticles,
  formatArticleDate,
  insightArticles,
  loadBlogArticle,
  NEWS_CATEGORY,
  newsArticles,
  type BlogArticle,
} from '../content/blogContent';
import { NotFoundPage } from './NotFoundPage';
import { PageClosing } from '../components/layout/PageClosing';
import { ArrowLeft, ArrowRight } from '../components/ui/Icons';

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
  if (!article) return <div className="section article-loading"><div className="container narrow">Loading article…</div></div>;

  const isNews = summary.category === NEWS_CATEGORY;
  const group = isNews ? newsArticles : insightArticles;
  const next = group[(group.indexOf(summary) + 1) % group.length];

  return <article className="blog-detail">
    <header className="section blog-header">
      <div className="container narrow">
        <Link className="article-back" to={isNews ? '/news-and-community' : '/insights'}><ArrowLeft /> {isNews ? 'All news' : 'All insights'}</Link>
        <p className="eyebrow">{articleCategory(article)}</p>
        <h1>{article.title}</h1>
        <div className="blog-meta"><span>{formatArticleDate(article.date)}</span><span>By {article.author}</span></div>
      </div>
    </header>
    {article.featuredImage && <div className="container blog-featured"><img src={article.featuredImage} alt="" /></div>}
    <section className="section blog-content-section">
      <div className="container narrow article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
    </section>
    <aside className="section related-article">
      <div className="container narrow">
        <p className="eyebrow">Read next</p>
        <Link to={`/insights/${next.slug}`}><h2>{next.title}</h2><span>Continue reading <ArrowRight /></span></Link>
      </div>
    </aside>
    <PageClosing />
  </article>;
}
