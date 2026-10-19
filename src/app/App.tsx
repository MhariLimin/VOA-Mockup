import { Navigate, Route, Routes } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { renamedRoutes } from '../content/renamedRoutes';
import { sourcePages } from '../content/sourcePages';
import { HomePage } from '../pages/HomePage';
import { BlogArticlePage } from '../pages/BlogArticlePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SourcePage } from '../pages/SourcePage';
import { StatePage } from '../pages/StatePage';
import { statePages } from '../content/statePages';
import { ThankYouPage } from '../pages/ThankYouPage';

export function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {sourcePages.map((page) => (
          <Route key={page.path} path={page.path} element={<SourcePage page={page} />} />
        ))}
        {Object.entries(renamedRoutes).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        {statePages.map((state) => (
          <Route key={state.slug} path={`/virtual-assistants/${state.slug}`} element={<StatePage state={state} />} />
        ))}
        <Route path="/insights/:slug" element={<BlogArticlePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageShell>
  );
}
