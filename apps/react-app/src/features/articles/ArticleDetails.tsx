import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Article } from "./articlesSlice";
import { Container, Typography, Button } from "@mui/material";

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8089/api/articles/${id}`)
      .then((res) => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4">{article.title}</Typography>
      <Typography>{article.content}</Typography>
      <Button
        component={Link}
        to={`/articles/${article.id}/edit`}
        variant="contained"
      >
        Edit
      </Button>
    </Container>
  );
}
