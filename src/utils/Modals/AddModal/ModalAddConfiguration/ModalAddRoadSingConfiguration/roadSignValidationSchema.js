import * as Yup from "yup";

export const roadSignValidationSchema = Yup.object({
  city: Yup.string().required("Required"),
});