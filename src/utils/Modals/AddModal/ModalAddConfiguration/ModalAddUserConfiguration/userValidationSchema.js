import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  format: Yup.string().required("Required"),
});