import { Route, Routes } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { sourcePages } from '../content/sourcePages';
import { HomePage } from '../pages/HomePage';
import { BlogArticlePage } from '../pages/BlogArticlePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SourcePage } from '../pages/SourcePage';
import { ThankYouPage } from '../pages/ThankYouPage';

export function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {sourcePages.map((page) => (
          <Route key={page.path} path={page.path} element={<SourcePage page={page} />} />
        ))}
        <Route path="/insights/:slug" element={<BlogArticlePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageShell>
  );
}
