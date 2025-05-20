import DynamicEditModal from "./DynamicEditModal";
import { useUpdateDiscountMutation } from "../../../redux/slice/super_admin/contracts/contractsApi";
import {
  useUpdateOrderMutation,
  useShowOneOrderQuery,
} from "../../../redux/slice/super_admin/orders/ordersApi";
import { useGetRoadSignsQuery } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
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
import { discountFields } from "./ModalEditConfiguration/DiscountModalEditConfiguration/discountFields";
import { discountValidationSchema } from "./ModalEditConfiguration/DiscountModalEditConfiguration/discountValidationSchema";
import { discountInitialValues } from "./ModalEditConfiguration/DiscountModalEditConfiguration/discountInitialValues";
import { orderFields } from "./ModalEditConfiguration/OrderModalEditConfiguration/orderFields";
import { orderValidationSchema } from "./ModalEditConfiguration/OrderModalEditConfiguration/orderValidationSchema";
import { orderInitialValues } from "./ModalEditConfiguration/OrderModalEditConfiguration/orderInitialValues";
import { superAdminFields } from "./ModalEditConfiguration/SuperAdminInfoModalEditConfiguration/superAdminFields";
import { superAdminValidationSchema } from "./ModalEditConfiguration/SuperAdminInfoModalEditConfiguration/superAdminValidationSchema";
import { superAdminInitialValues } from "./ModalEditConfiguration/SuperAdminInfoModalEditConfiguration/superAdminInitialValues";
import { useUpdateSuperAdminInfoMutation } from "../../../hooks/superAdmin/useUpdateSuperAdminInfoMutation";
import { adminFields } from "./ModalEditConfiguration/AdminModalEditConfiguration/adminFields";
import { adminValidationSchema } from "./ModalEditConfiguration/AdminModalEditConfiguration/adminValidationSchema";
import { adminInitialValues } from "./ModalEditConfiguration/AdminModalEditConfiguration/adminInitialValues";
import { codingFields } from "./ModalEditConfiguration/CodingModalEditConfiguration/codingFields";
import { codingValidationSchema } from "./ModalEditConfiguration/CodingModalEditConfiguration/codingValidationSchema";
import { codingInitialValues } from "./ModalEditConfiguration/CodingModalEditConfiguration/codingInitialValues";
import { userFields } from "./ModalEditConfiguration/UserModalEditConfiguration/userFields";
import { userValidationSchema } from "./ModalEditConfiguration/UserModalEditConfiguration/userValidationSchema";
import { userInitialValues } from "./ModalEditConfiguration/UserModalEditConfiguration/userInitialValues";
import { reservationFields } from "./ModalEditConfiguration/ReservationModalEditConfiguration/reservationFields";
import { reservationValidationSchema } from "./ModalEditConfiguration/ReservationModalEditConfiguration/reservationValidationSchema";
import { reservationInitialValues } from "./ModalEditConfiguration/ReservationModalEditConfiguration/reservationInitialValues";
import { roadSignFields } from "./ModalEditConfiguration/RoadSignModalEditConfiguration/roadSignFields";
import { roadSignValidationSchema } from "./ModalEditConfiguration/RoadSignModalEditConfiguration/roadSignValidationSchema";
import { roadSignInitialValues } from "./ModalEditConfiguration/RoadSignModalEditConfiguration/roadSignInitialValues";

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