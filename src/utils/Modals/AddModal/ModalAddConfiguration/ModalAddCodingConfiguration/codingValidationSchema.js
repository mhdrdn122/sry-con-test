import * as Yup from "yup";

export const codingValidationSchema = Yup.object({
  model: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  format: Yup.string().required("Required"),
});