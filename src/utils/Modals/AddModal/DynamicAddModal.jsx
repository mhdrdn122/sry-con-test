import DynamicModal from "./ModalAdd";
import { useAddNewAdminMutation } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import { useAddNewCodingMutation, useGetRoadCodingsQuery } from "../../../redux/slice/super_admin/codings/codingsApi";
import { useAddNewCashPaymentMutation, useGetCodingsQuery } from "../../../redux/slice/super_admin/payments/paymentsApi";
import { useAddNewRoadSignMutation } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
import { useAddNewUserMutation } from "../../../redux/slice/super_admin/users/usersApi";
import { adminFields } from "./ModalAddConfiguration/ModalAddAdminConfiguration/adminFields";
import { adminValidationSchema } from "./ModalAddConfiguration/ModalAddAdminConfiguration/adminValidationSchema";
import { adminInitialValues } from "./ModalAddConfiguration/ModalAddAdminConfiguration/adminInitialValues";
import { codingFields } from "./ModalAddConfiguration/ModalAddCodingConfiguration/codingFields";
import { codingValidationSchema } from "./ModalAddConfiguration/ModalAddCodingConfiguration/codingValidationSchema";
import { codingInitialValues } from "./ModalAddConfiguration/ModalAddCodingConfiguration/codingInitialValues";
import { cashPaymentFields } from "./ModalAddConfiguration/ModalAddPaymentConfiguration/cashPaymentFields";
import { cashPaymentValidationSchema } from "./ModalAddConfiguration/ModalAddPaymentConfiguration/cashPaymentValidationSchema";
import { cashPaymentInitialValues } from "./ModalAddConfiguration/ModalAddPaymentConfiguration/cashPaymentInitialValues";
import { cashPaymentOnSubmitTransform } from "./ModalAddConfiguration/ModalAddPaymentConfiguration/cashPaymentOnSubmitTransform";
import { roadSignFields } from "./ModalAddConfiguration/ModalAddRoadSingConfiguration/roadSignFields";
import { roadSignValidationSchema } from "./ModalAddConfiguration/ModalAddRoadSingConfiguration/roadSignValidationSchema";
import { roadSignInitialValues } from "./ModalAddConfiguration/ModalAddRoadSingConfiguration/roadSignInitialValues";
import { userFields } from "./ModalAddConfiguration/ModalAddUserConfiguration/userFields";
import { userValidationSchema } from "./ModalAddConfiguration/ModalAddUserConfiguration/userValidationSchema";
import { userInitialValues } from "./ModalAddConfiguration/ModalAddUserConfiguration/userInitialValues";



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
  console.log(show)
  console.log("show")

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