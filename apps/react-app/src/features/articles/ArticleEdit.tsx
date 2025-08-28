import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch } from '../../app/store';
import ArticleForm from './ArticleForm';
import type { Article } from './articlesSlice';
import { createArticle, updateArticle } from './articlesSlice';

export default function ArticleEdit() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    if (id) {
      axios.get(`http://localhost:8089/api/articles/${id}`).then(res => setArticle(res.data));
    }
  }, [id]);

  console.log(article);
  if (id && !article) return <p>Loading...</p>;

  return (
    <ArticleForm
      initialValues={article || { title: '', content: '', author: '', image: null }}
      onSubmit={async values => {
        if (!article) {
          await dispatch(createArticle(values));
        } else {
          await dispatch(
            updateArticle({
              id: article.id,
              article: values,
            })
          );
        }
        navigate('/');
      }}
    />
  );
}
