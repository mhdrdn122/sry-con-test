import * as Yup from "yup";
import DynamicEditModal from "./DynamicEditModal";
import { useUpdateDiscountMutation } from "../../../redux/slice/super_admin/contracts/contractsApi";
import {
  useUpdateOrderMutation,
  useShowOneOrderQuery,
} from "../../../redux/slice/super_admin/orders/ordersApi";
import { useGetRoadSignsQuery } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
import { updateSuperAdminInfo } from "../../../redux/slice/super_admin/auth/authSlice";
import {
  useUpdateAdminMutation,
  useShowOneAdminQuery,
} from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import {
  useUpdateCodingMutation,
  useShowOneCodingQuery,
} from "../../../redux/slice/super_admin/codings/codingsApi";
import {
  useUpdateUserMutation,
  useShowOneUserQuery,
} from "../../../redux/slice/super_admin/users/usersApi";
import {
  useUpdateReservationMutation,
  useShowOneReservationQuery,
} from "../../../redux/slice/super_admin/reservations/reservationsApi";
import {
  useUpdateRoadSignMutation,
  useShowOneRoadSignQuery,
} from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
import { useGetUsersQuery } from "../../../redux/slice/super_admin/users/usersApi";
import { useGetRoadCodingsQuery } from "../../../redux/slice/super_admin/codings/codingsApi";
import { useDispatch } from "react-redux";

// Discount Modal Configuration
const discountFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "discount", label: "الخصم", type: "number", dir: "rtl" },
];

const discountValidationSchema = Yup.object({
  discount: Yup.number().required("Required"),
});

const discountInitialValues = {
  id: "",
  discount: "",
};

// Order Modal Configuration
const orderFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "note", label: "ملاحظة", type: "text", dir: "rtl" },
  {
    name: "date",
    label: "تاريخ البدء",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "road_sign_id",
    label: "عنوان اللوحة",
    type: "select",
    dataKey: "roadSigns",
    valueKey: "id",
    displayKey: "region",
    secondaryDisplayKey: "place",
  },
];

const orderValidationSchema = Yup.object({
  note: Yup.string(),
  date: Yup.string(),
  road_sign_id: Yup.string(),
});

const orderInitialValues = {
  id: "",
  note: "",
  date: "",
  road_sign_id: "",
};

// SuperAdminInfo Modal Configuration
const superAdminFields = [
  { name: "username", label: "اسم المستخدم", dir: "rtl" },
  { name: "password", label: "كلمة السر", type: "password", dir: "rtl" },
];

const superAdminValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "يجب أن يكون الاسم 2 أحرف أو أكثر")
    .required("هذا الحقل مطلوب"),
  password: Yup.string()
    .min(8, "يجب أن تكون كلمة السر 8 أحرف أو أكثر")
    .required("هذا الحقل مطلوب"),
});

const superAdminInitialValues = {
  username: "",
  password: "",
};

// Admin Modal Configuration
const adminFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "name", label: "الاسم", type: "text", dir: "rtl" },
  { name: "username", label: "اسم المستخدم", type: "text", dir: "rtl" },
  { name: "password", label: "كلمة السر", type: "password", dir: "rtl" },
  { name: "phone", label: "الرقم", type: "text", dir: "rtl" },
  { name: "address", label: "العنوان", type: "text", dir: "rtl" },
];

const adminValidationSchema = Yup.object({
  name: Yup.string(),
  username: Yup.string(),
  password: Yup.string(),
  phone: Yup.string(),
  address: Yup.string(),
});

const adminInitialValues = {
  id: "",
  name: "",
  username: "",
  password: "",
  phone: "",
  address: "",
};

// Coding Modal Configuration
const codingFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "type", label: "النوع", type: "text", dir: "rtl" },
  { name: "model", label: "النموذج", type: "text", dir: "rtl" },
  { name: "size", label: "الحجم", type: "text", dir: "rtl" },
  { name: "price", label: "السعر", type: "text", dir: "rtl" },
  { name: "format", label: "نوع النموذج", type: "text", dir: "rtl" },
];

const codingValidationSchema = Yup.object({
  type: Yup.string(),
  model: Yup.string(),
  size: Yup.string(),
  price: Yup.string(),
  format: Yup.string(),
});

const codingInitialValues = {
  id: "",
  type: "",
  model: "",
  size: "",
  price: "",
  format: "",
};

// User Modal Configuration
const userFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "name", label: "الاسم", type: "text", dir: "rtl" },
  { name: "email", label: "الايميل", type: "text", dir: "rtl" },
  { name: "company_name", label: "اسم الشركة", type: "text", dir: "rtl" },
  { name: "phone", label: "رقم الهاتف", type: "text", dir: "rtl" },
  { name: "address", label: "العنوان", type: "text", dir: "rtl" },
  {
    name: "registration_number",
    label: "رقم السجل التجاري",
    type: "text",
    dir: "rtl",
  },
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
  format: Yup.string().required("Required"),
});

const userInitialValues = {
  id: "",
  name: "",
  email: "",
  company_name: "",
  phone: "",
  address: "",
  registration_number: "",
  format: "",
};

// Reservation Modal Configuration
const reservationFields = [
  { name: "id", label: "ID", type: "hidden" },
  {
    name: "road_sign_id",
    label: "عنوان اللوحة",
    type: "select",
    dataKey: "roadSigns",
    valueKey: "id",
    displayKey: "region",
    secondaryDisplayKey: "place",
  },
  {
    name: "type",
    label: "مؤقت أو دائم",
    type: "select",
    options: [
      { value: "temporary", label: "مؤقت" },
      { value: "permanent", label: "دائم" },
    ],
  },
  {
    name: "start_date",
    label: "تاريخ البدء",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "end_date",
    label: "تاريخ النهاية",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "with_print",
    label: "مع طباعة",
    type: "select",
    options: [
      { value: 0, label: "لا" },
      { value: 1, label: "نعم" },
    ],
  },
  {
    name: "user_id",
    label: "المستخدم",
    type: "select",
    dataKey: "users",
    valueKey: "id",
    displayKey: "name",
  },
  { name: "number_of_faces", label: "عدد الوجوه", type: "text", dir: "rtl" },
  { name: "signs_number", label: "عدد اللوحات", type: "text", dir: "rtl" },
];

const reservationValidationSchema = Yup.object({
  road_sign_id: Yup.string(),
  type: Yup.string(),
  start_date: Yup.string(),
  end_date: Yup.string(),
  with_print: Yup.number(),
  user_id: Yup.string(),
  number_of_faces: Yup.string(),
  signs_number: Yup.string(),
});

const reservationInitialValues = {
  id: "",
  road_sign_id: "",
  type: "",
  start_date: "",
  end_date: "",
  with_print: "",
  user_id: "",
  number_of_faces: "",
  signs_number: "",
};

// RoadSign Modal Configuration
const roadSignFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "region", label: "المنطقة", type: "text", dir: "rtl" },
  { name: "city", label: "المدينة", type: "text", dir: "rtl" },
  { name: "place", label: "مكان التموضع", type: "text", dir: "rtl" },
  { name: "direction", label: "الاتجاه", type: "text", dir: "rtl" },
  { name: "printing_price", label: "سعر الطباعة", type: "text", dir: "rtl" },
  { name: "signs_number", label: "عدد اللوحات", type: "text", dir: "rtl" },
  { name: "number_of_faces", label: "عدد الوجوه", type: "text", dir: "rtl" },
  { name: "meters_number", label: "عدد الأمتار", type: "text", dir: "rtl" },
  {
    name: "meters_number_printing",
    label: "عدد أمتار الطباعة",
    type: "text",
    dir: "rtl",
  },
  {
    name: "coding_id",
    label: "النموذج",
    type: "select",
    dataKey: "codings",
    valueKey: "id",
    displayKey: "model",
    secondaryDisplayKey: "type",
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

const roadSignInitialValues = {
  id: "",
  region: "",
  city: "",
  place: "",
  direction: "",
  printing_price: "",
  signs_number: "",
  number_of_faces: "",
  meters_number: "",
  meters_number_printing: "",
  coding_id: "",
  status: "",
};

// Custom mutation hook for SuperAdminInfo
const useUpdateSuperAdminInfoMutation = () => {
  const dispatch = useDispatch();
  return [
    async (values) => {
      try {
        await dispatch(updateSuperAdminInfo(values)).unwrap();
        return { status: true, message: "تم تحديث المعلومات بنجاح" };
      } catch (err) {
        throw err;
      }
    },
    { isLoading: false, isSuccess: false, isError: false, error: null },
  ];
};

// Discount Modal Component
export const ModalEditDiscount = ({ show, handleClose }) => {
  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل قيمة الحسم"
      fields={discountFields}
      validationSchema={discountValidationSchema}
      mutationHook={useUpdateDiscountMutation}
      initialValues={{
        ...discountInitialValues,
        id: show?.id || "",
        discount: show?.discount || "",
      }}
    />
  );
};

// Order Modal Component
export const ModalEditOrder = ({ show, handleClose }) => {
  const { data: roadSigns } = useGetRoadSignsQuery(
    { page: 1, refresh: false, per_page: 1000 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات الطلب"
      fields={orderFields}
      validationSchema={orderValidationSchema}
      mutationHook={useUpdateOrderMutation}
      initialValues={orderInitialValues}
      selectData={{ roadSigns }}
      fetchDataHook={useShowOneOrderQuery}
      fetchDataId={show}
    />
  );
};

// SuperAdminInfo Modal Component
export const ModalEditSuperAdminInfo = ({ show, handleClose }) => {
  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات المدير"
      fields={superAdminFields}
      validationSchema={superAdminValidationSchema}
      mutationHook={useUpdateSuperAdminInfoMutation}
      initialValues={superAdminInitialValues}
    />
  );
};

// Admin Modal Component
export const ModalEditAdmin = ({ show, handleClose }) => {
  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات موظف"
      fields={adminFields}
      validationSchema={adminValidationSchema}
      mutationHook={useUpdateAdminMutation}
      initialValues={{
        ...adminInitialValues,
        id: show?.id || "",
        name: show?.name || "",
        username: show?.username || "",
        password: show?.password || "",
        phone: show?.phone || "",
        address: show?.address || "",
      }}
      fetchDataHook={useShowOneAdminQuery}
      fetchDataId={show?.id}
    />
  );
};

// Coding Modal Component
export const ModalEditCoding = ({ show, handleClose }) => {
  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل النموذج"
      fields={codingFields}
      validationSchema={codingValidationSchema}
      mutationHook={useUpdateCodingMutation}
      initialValues={{
        ...codingInitialValues,
        id: show?.id || "",
        type: show?.type || "",
        model: show?.model || "",
        size: show?.size || "",
        price: show?.price || "",
        format: show?.format || "",
      }}
      fetchDataHook={useShowOneCodingQuery}
      fetchDataId={show?.id}
    />
  );
};

// User Modal Component
export const ModalEditUser = ({ show, handleClose }) => {
  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات زبون"
      fields={userFields}
      validationSchema={userValidationSchema}
      mutationHook={useUpdateUserMutation}
      initialValues={{
        ...userInitialValues,
        id: show?.id || "",
        name: show?.name || "",
        email: show?.email || "",
        company_name: show?.company_name || "",
        phone: show?.phone || "",
        address: show?.address || "",
        registration_number: show?.registration_number || "",
        format: show?.format || "",
      }}
      fetchDataHook={useShowOneUserQuery}
      fetchDataId={show?.id}
    />
  );
};

// Reservation Modal Component
export const ModalEditReservation = ({ show, handleClose }) => {
  const { data: roadSigns } = useGetRoadSignsQuery(
    { page: 1, refresh: false, per_page: 1000 },
    { refetchOnMountOrArgChange: true }
  );
  const { data: users } = useGetUsersQuery(
    { page: 1, refresh: false, per_page: 1000 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات الحجز"
      fields={reservationFields}
      validationSchema={reservationValidationSchema}
      mutationHook={useUpdateReservationMutation}
      initialValues={reservationInitialValues}
      selectData={{ roadSigns, users }}
      fetchDataHook={useShowOneReservationQuery}
      fetchDataId={show}
    />
  );
};

// RoadSign Modal Component
export const ModalEditRoadSign = ({ show, handleClose }) => {
  const { data: codings } = useGetRoadCodingsQuery(
    { page: 1, refresh: false, per_page: 1000 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <DynamicEditModal
      show={show}
      handleClose={handleClose}
      title="تعديل معلومات اللوحة"
      fields={roadSignFields}
      validationSchema={roadSignValidationSchema}
      mutationHook={useUpdateRoadSignMutation}
      initialValues={{
        ...roadSignInitialValues,
        id: show?.id || "",
        region: show?.region || "",
        city: show?.city || "",
        place: show?.place || "",
        direction: show?.direction || "",
        printing_price: show?.printing_price || "",
        signs_number: show?.signs_number || "",
        number_of_faces: show?.number_of_faces || "",
        meters_number: show?.meters_number || "",
        meters_number_printing: show?.meters_number_printing || "",
        coding_id: show?.coding_id || "",
        status: show?.status || "",
      }}
      selectData={{ codings }}
      fetchDataHook={useShowOneRoadSignQuery}
      fetchDataId={show?.id}
    />
  );
};