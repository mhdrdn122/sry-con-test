import * as Yup from 'yup';

export const roadSignValidationSchema = Yup.object({
  region: Yup.string(),
  city: Yup.string(),
  place: Yup.string(),
  direction: Yup.string(),
  printing_price: Yup.string(),
  signs_number: Yup.string(),
  number_of_faces: Yup.string(),
  meters_number: Yup.string(),
  meters_number_printing: Yup.string(),
  coding_id: Yup.string(),
  status: Yup.string(),
}); 