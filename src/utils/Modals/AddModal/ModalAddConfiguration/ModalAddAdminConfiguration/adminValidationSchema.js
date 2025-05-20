import * as Yup from "yup";

export const adminValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});