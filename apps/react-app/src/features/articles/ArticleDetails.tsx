import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Article } from './articlesSlice';
import { Container, Typography, Button, Box } from '@mui/material';
import config from '../../config';

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(config.serverURL + `/api/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', gap: 4, paddingBottom: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" textTransform="uppercase">
            {article.title}
          </Typography>
          <Typography>{article.content}</Typography>
        </Box>
        {!!article.image_url && (
          <Box
            component="img"
            sx={{
              objectFit: 'cover',
              width: 400,
              overflow: 'hidden',
              aspectRatio: '16/9',
              borderRadius: 8,
            }}
            src={config.serverURL + article.image_url}
          />
        )}
      </Box>
      <hr />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'end',
          marginTop: 2,
        }}
      >
        <Button color="inherit" variant="contained" sx={{ width: 100 }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          component={Link}
          sx={{ width: 100 }}
          to={`/articles/${article.id}/edit`}
          variant="contained"
        >
          Edit
        </Button>
      </Box>
    </Container>
  );
}
