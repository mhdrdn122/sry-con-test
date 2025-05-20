import * as Yup from 'yup'
export const superAdminValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "يجب أن يكون الاسم 2 أحرف أو أكثر")
    .required("هذا الحقل مطلوب"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة السر 8 أحرف أو أكثر")
    .required("هذا الحقل مطلوب"),
});