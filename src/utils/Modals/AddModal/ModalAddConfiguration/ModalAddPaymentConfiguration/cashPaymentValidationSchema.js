import * as Yup from "yup";

export const cashPaymentValidationSchema = Yup.object({
  amount_paid: Yup.string().required("Required"),
  image: Yup.mixed().required("Required"),
});