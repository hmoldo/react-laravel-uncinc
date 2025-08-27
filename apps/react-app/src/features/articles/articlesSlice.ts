import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { DataModel } from '@toolpad/core';
import axios from 'axios';
import config from '../../config';

const serverURL = config.serverURL + '/api/articles';

export interface Article extends DataModel {
  id: number;
  title: string;
  content: string;
  author: string;
  image: File | null;
}
export interface ArticleInitialValues {
  id?: number;
  title: string;
  content: string;
  author: string;
  image: File | null;
}

interface ArticlesState {
  items: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchArticles = createAsyncThunk('articles/fetchAll', async () => {
  const response = await axios.get<Article[]>(serverURL);
  return response.data;
});

export const fetchArticle = createAsyncThunk('articles/fetchOne', async (id: number) => {
  const response = await axios.get<Article>(`${serverURL}/${id}`);
  return response.data;
});

export const createArticle = createAsyncThunk('articles/create', async (article: FormData) => {
  const response = await axios.post<Article>(serverURL, article, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateArticle = createAsyncThunk('articles/update', async (article: Article) => {
  const response = await axios.put<Article>(`${serverURL}/${article.id}`, article);
  return response.data;
});

export const deleteArticle = createAsyncThunk('articles/delete', async (id: number) => {
  await axios.delete(`${serverURL}/${id}`);
  return id;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching articles';
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.items.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        const index = state.items.findIndex(a => a.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(a => a.id !== action.payload);
      });
  },
});

export default articlesSlice.reducer;
