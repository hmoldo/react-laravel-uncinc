import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { deleteArticle, fetchArticles } from './articlesSlice';
// choose one
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/RemoveRedEye';
import { DataGrid, GridActionsCellItem, type GridColDef, type GridRowId } from '@mui/x-data-grid';

import { Box, Button, CircularProgress, Container } from '@mui/material';
import config from '../../config';
const { IMG_URL } = config;

export default function ArticlesList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.articles);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const handleViewClick = (id: GridRowId) => () => {
    navigate(`/articles/${id}`);
  };
  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/articles/${id}/edit`);
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(deleteArticle(id as number));
  };

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: ({ value }) => {
        return value ? (
          <div
            style={{
              display: 'flex',
              placeItems: 'center',

              marginLeft: -10,
              width: 120,
              height: 80,
              position: 'relative',
            }}
          >
            <figure
              style={{
                display: 'block',
                margin: 4,
                padding: 0,
                borderRadius: 4,
                overflow: 'hidden',
                height: 72,
              }}
            >
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={IMG_URL + value}
              />
            </figure>
          </div>
        ) : (
          'No image'
        );
      },
    },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'content', headerName: 'Content', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<ViewIcon />}
            label="View"
            className="textPrimary"
            onClick={handleViewClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          typography: 'body1',
        }}
      >
        <h2>Articles</h2>
        <Button component={Link} to="/articles/new" variant="contained" color="primary">
          Create
        </Button>
      </Box>
      <DataGrid
        rows={items}
        columns={columns}
        getRowHeight={({ model }) => (model.image ? 80 : 40)}
      />
    </Container>
  );
}
