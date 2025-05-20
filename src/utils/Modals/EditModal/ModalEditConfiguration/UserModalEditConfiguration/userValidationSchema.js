import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  format: Yup.string().required("Required"),
}); 