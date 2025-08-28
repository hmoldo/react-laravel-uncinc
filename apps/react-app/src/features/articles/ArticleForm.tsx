import { Box, Button, TextField } from '@mui/material';
import { Formik, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ImageUploader from '../../components/ImageUploader';
import type { ArticleInitialValues } from './articlesSlice';

interface ArticleFormProps {
  initialValues: ArticleInitialValues;
  onSubmit: (values: FormData) => void;
}

export default function ArticleForm({ initialValues, onSubmit }: ArticleFormProps) {
  const navigate = useNavigate();
  const handleSubmit = async (
    values: ArticleInitialValues,
    formikHelpers: FormikHelpers<ArticleInitialValues>
  ) => {
    const { setSubmitting } = formikHelpers;
    const formData = new FormData();
    // Append all form values
    if (values.id) {
      formData.append('_method', 'patch');
    }
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('content', values.content);

    if (values.image) {
      formData.append('image', values.image);
    }

    await onSubmit(formData);
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    author: Yup.string(),
    //   image: Yup.mixed().required('Image is required'),
  });

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            margin="normal"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            id="content"
            name="content"
            label="Content"
            margin="normal"
            multiline
            rows={4}
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <TextField
            fullWidth
            id="author"
            name="author"
            label="Author"
            margin="normal"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <ImageUploader label="Upload an image" name="image" />
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
            <Button color="primary" variant="contained" sx={{ width: 100 }} type="submit">
              Save
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
