import * as Yup from "yup";

export const codingValidationSchema = Yup.object({
  type: Yup.string(),
  model: Yup.string(),
  size: Yup.string(),
  price: Yup.string(),
  format: Yup.string(),
}); 