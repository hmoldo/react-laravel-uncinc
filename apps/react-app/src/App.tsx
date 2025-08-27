import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticleDetails from './features/articles/ArticleDetails';
import ArticleEdit from './features/articles/ArticleEdit';
import ArticlesList from './features/articles/ArticlesList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/new" element={<ArticleEdit />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/articles/:id/edit" element={<ArticleEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
