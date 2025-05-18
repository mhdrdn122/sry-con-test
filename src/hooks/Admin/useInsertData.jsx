import baseURL from "../../Api/baseURL";
const useInsertDataSuperAdmin = async (url, params ) => {
    const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
    const config = {
      headers: {
        // Authorization: `Bearer ${superAdminInfo && superAdminInfo.token}`,
        // platform: window.navigator.userAgentData.platform
      },
    };
    const res = await baseURL.post(url, params, config);
    return res;
  };
  export {
    useInsertDataSuperAdmin,
  };