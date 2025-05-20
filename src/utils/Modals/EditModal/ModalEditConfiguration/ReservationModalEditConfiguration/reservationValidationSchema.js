import * as Yup from 'yup';

export const reservationValidationSchema = Yup.object({
  road_sign_id: Yup.string(),
  type: Yup.string(),
  start_date: Yup.string(),
  end_date: Yup.string(),
  with_print: Yup.number(),
  user_id: Yup.string(),
  number_of_faces: Yup.string(),
  signs_number: Yup.string(),
}); 