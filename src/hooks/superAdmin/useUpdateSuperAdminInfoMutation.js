import { useDispatch } from "react-redux";
import { updateSuperAdminInfo } from "../../redux/slice/super_admin/auth/authSlice";

// Custom mutation hook for SuperAdminInfo
export const useUpdateSuperAdminInfoMutation = () => {
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