import * as Yup from "yup";
export const adminValidationSchema = Yup.object({
  name: Yup.string(),
  username: Yup.string(),
  password: Yup.string(),
  phone: Yup.string(),
  address: Yup.string(),
});
 