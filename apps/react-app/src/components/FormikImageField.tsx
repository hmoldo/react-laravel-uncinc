import React from "react";
import { useField, useFormikContext } from "formik";

interface FormikImageFieldProps {
  name: string;
  label?: string;
  accept?: string; // default to "image/*"
}

const FormikImageField: React.FC<FormikImageFieldProps> = ({
  name,
  label,
  accept = "image/*",
}) => {
  const [field, meta] = useField<File | null>(name);
  const { setFieldValue } = useFormikContext<null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    setFieldValue(name, file);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleChange}
      />

      {/* Show validation error */}
      {meta.touched && meta.error ? (
        <div style={{ color: "red", fontSize: "0.8rem" }}>{meta.error}</div>
      ) : null}

      {/* Preview image */}
      {field.value && (
        <div style={{ marginTop: "0.5rem" }}>
          <img
            src={URL.createObjectURL(field.value)}
            alt="preview"
            style={{ width: 150, height: "auto", borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
};

export default FormikImageField;
