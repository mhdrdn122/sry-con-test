import * as Yup from "yup";

export const discountValidationSchema = Yup.object({
  discount: Yup.number().required("Required"),
}); 