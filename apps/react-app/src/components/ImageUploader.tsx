// ImageUploader.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useField, type FieldHookConfig } from 'formik';
import { Box, Typography, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type ImageUploaderProps = {
  label: string;
  name: string;
} & React.HTMLProps<HTMLInputElement>;

const ImageUploader = ({ label, ...props }: ImageUploaderProps) => {
  const [, meta, helpers] = useField(props as FieldHookConfig<File | null>);
  const { setValue } = helpers;
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  return (
    <Box>
      <Typography variant="body1" component="label" sx={{ mb: 1, display: 'block' }}>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor:
            meta.touched && meta.error ? 'error.main' : isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              position: 'absolute',
            }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2">
              Drag 'n' drop an image here, or click to select one
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Select Image
            </Button>
          </Box>
        )}
      </Box>
      {meta.touched && meta.error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploader;
