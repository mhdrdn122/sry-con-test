import * as Yup from "yup";
import DynamicModal from "./ModalAdd";
import { useAddNewAdminMutation } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import { useAddNewCodingMutation, useGetRoadCodingsQuery } from "../../../redux/slice/super_admin/codings/codingsApi";
import { useAddNewCashPaymentMutation, useGetCodingsQuery } from "../../../redux/slice/super_admin/payments/paymentsApi";
import { useAddNewRoadSignMutation } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
import { useAddNewUserMutation } from "../../../redux/slice/super_admin/users/usersApi";

// Admin Modal Configuration
const adminFields = [
  { name: "name", label: "الاسم", dir: "rtl" },
  { name: "username", label: "اسم المستخدم" },
  { name: "password", label: "كلمة السر", type: "password" },
  { name: "phone", label: "رقم الهاتف" },
  { name: "address", label: "العنوان" },
];

const adminValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const adminInitialValues = {
  name: "",
  username: "",
  password: "",
  phone: "",
  address: "",
};

// Coding Modal Configuration
const codingFields = [
  { name: "type", label: "النوع" },
  { name: "model", label: "النموذج", dir: "rtl" },
  { name: "size", label: "الحجم", dir: "rtl" },
  { name: "price", label: "السعر", dir: "rtl" },
  { name: "format", label: "نوع النموذج", dir: "rtl" },
];

const codingValidationSchema = Yup.object({
  model: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  format: Yup.string().required("Required"),
});

const codingInitialValues = {
  model: "",
  type: "",
  size: "",
  price: "",
  format: "",
};

// Cash Payment Modal Configuration
const cashPaymentFields = [
  { name: "amount_paid", label: "المبلغ المراد دفعه" },
  {
    name: "code",
    label: "الكود",
    type: "select",
    dataKey: "codings",
    valueKey: "code",
    displayKey: "code",
  },
  { name: "image", label: "صورة الإيصال", type: "file", accept: "image/*" },
];

const cashPaymentValidationSchema = Yup.object({
  amount_paid: Yup.string().required("Required"),
  image: Yup.mixed().required("Required"),
});

const cashPaymentInitialValues = {
  amount_paid: "",
  code: "",
  image: "",
};

const cashPaymentOnSubmitTransform = (values) => {
  const formData = new FormData();
  formData.append("amount_paid", values.amount_paid);
  if (values.image) {
    formData.append("image", values.image);
  }
  formData.append("code", values.code);
  return formData;
};

// Road Sign Modal Configuration
const roadSignFields = [
  { name: "region", label: "المنطقة", dir: "rtl" },
  { name: "city", label: "المدينة" },
  { name: "place", label: "مكان التموضع" },
  { name: "direction", label: "الاتجاه" },
  { name: "printing_price", label: "سعر الطباعة" },
  { name: "signs_number", label: "عدد اللوحات" },
  { name: "number_of_faces", label: "عدد الوجوه" },
  { name: "meters_number", label: "عدد الأمتار" },
  { name: "meters_number_printing", label: "عدد أمتار الطباعة" },
  {
    name: "coding_id",
    label: "النموذج",
    type: "select",
    dataKey: "codings",
    valueKey: "id",
    displayKey: "model",
  },
  {
    name: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "قيد الإنشاء", label: "قيد الإنشاء" },
      { value: "متاح", label: "متاح" },
    ],
  },
];

const roadSignValidationSchema = Yup.object({
  city: Yup.string().required("Required"),
});

const roadSignInitialValues = {
  region: "",
  signs_number: "",
  number_of_faces: "",
  meters_number: "",
  meters_number_printing: "",
  printing_price: "",
  coding_id: "",
  place: "",
  city: "",
  direction: "",
  status: "",
};

// User Modal Configuration
const userFields = [
  { name: "name", label: "الاسم", dir: "rtl" },
  { name: "email", label: "الايميل" },
  { name: "company_name", label: "اسم الشركة" },
  { name: "phone", label: "رقم الهاتف" },
  { name: "address", label: "العنوان" },
  { name: "registration_number", label: "رقم السجل التجاري" },
  {
    name: "format",
    label: "نوع النموذج",
    type: "select",
    options: [
      { value: "أجنبي", label: "أجنبي" },
      { value: "أجنبي سوري", label: "أجنبي سوري" },
      { value: "وطني سوري", label: "وطني سوري" },
    ],
  },
];

const userValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  format: Yup.string().required("Required"),
});

const userInitialValues = {
  name: "",
  email: "",
  company_name: "",
  phone: "",
  address: "",
  registration_number: "",
  format: "",
};

// Admin Modal Component
export const ModalAddAdmin = ({ show, handleClose }) => {
  return (
    <DynamicModal
      show={show}
      handleClose={handleClose}
      title="إضافة موظف"
      fields={adminFields}
      validationSchema={adminValidationSchema}
      mutationHook={useAddNewAdminMutation}
      initialValues={adminInitialValues}
    />
  );
};

// Coding Modal Component
export const ModalAddCoding = ({ show, handleClose }) => {
  return (
    <DynamicModal
      show={show}
      handleClose={handleClose}
      title="إضافة نموذج"
      fields={codingFields}
      validationSchema={codingValidationSchema}
      mutationHook={useAddNewCodingMutation}
      initialValues={codingInitialValues}
    />
  );
};

// Cash Payment Modal Component
export const ModalAddCashPayment = ({ show, handleClose }) => {
  const { data: codingsData } = useGetCodingsQuery({ page: 1 });
  return (
    <DynamicModal
      show={show}
      handleClose={handleClose}
      title="إضافة دفعة"
      fields={cashPaymentFields}
      validationSchema={cashPaymentValidationSchema}
      mutationHook={useAddNewCashPaymentMutation}
      initialValues={cashPaymentInitialValues}
      selectData={{ codings: codingsData }}
      onSubmitTransform={cashPaymentOnSubmitTransform}
    />
  );
};

// Road Sign Modal Component
export const ModalAddRoadSign = ({ show, handleClose }) => {
  const { data: codings } = useGetRoadCodingsQuery({ page: 1, refresh: false, per_page: 1000 });
  return (
    <DynamicModal
      show={show}
      handleClose={handleClose}
      title="إضافة لوحة طرقية"
      fields={roadSignFields}
      validationSchema={roadSignValidationSchema}
      mutationHook={useAddNewRoadSignMutation}
      initialValues={roadSignInitialValues}
      selectData={{ codings }}
    />
  );
};

// User Modal Component
export const ModalAddUser = ({ show, handleClose }) => {
  return (
    <DynamicModal
      show={show}
      handleClose={handleClose}
      title="إضافة زبون"
      fields={userFields}
      validationSchema={userValidationSchema}
      mutationHook={useAddNewUserMutation}
      initialValues={userInitialValues}
    />
  );
};