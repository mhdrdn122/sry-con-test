import * as Yup from "yup";

export const orderValidationSchema = Yup.object({
  note: Yup.string(),
  date: Yup.string(),
  road_sign_id: Yup.string(),
}); 