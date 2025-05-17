import { FaDownload, FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdAutorenew } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { HiOutlineInformationCircle } from "react-icons/hi2";

export const actionsAddReservationContainer = (handleShowRoadSign) =>  ([
  {
    label: 'عرض',
    icon: <FaEye />,
    color: '#289FBF',
    onClick: handleShowRoadSign
  }
]);


export const actionsAdminsContainer = (handleShowAdmin , handleShowEdit , handleShowDelete) => (
  [
        {
            label: 'View',
            icon: <FaEye />,
            color: '#289FBF',
            onClick: handleShowAdmin
        },
        {
            label: 'Edit',
            icon: <EditOutlinedIcon />,
            color: 'orange',
            onClick: handleShowEdit
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            color: 'red',
            onClick: (row) => handleShowDelete(row.id)
        }
    ]
 )


 export const actionsCodingContainer =  (handleShowEdit , handleShowDelete , superAdminInfo) => ( [
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: handleShowEdit
    },
    ...(superAdminInfo?.role === 'super' ? [
      {
        label: 'حذف',
        icon: <DeleteIcon />,
        color: 'red',
        onClick: (row) => handleShowDelete(row.id)
      }
    ] : [])
  ]);


  export const actionsContractContainer = (handleDownload , handleRenewalContract, handleEdit , handleDelete , isFetching , loading , superAdminInfo) => (
    [
    {
      label: 'تحميل',
      icon: <FaDownload />,
      color: 'blue',
      onClick: handleDownload,
      disabled: isFetching || loading
    },
    {
      label: 'تعديل الحسم',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: handleEdit,
      disabled: isFetching || loading
    },
    {
      label: 'تجديد عقد',
      icon: <MdAutorenew />,
      color: 'green',
      onClick: handleRenewalContract,
      disabled: isFetching || loading,
      condition: (row) => !!row.company_name
    },
    {
      label: 'حذف عقد',
      icon: <CiCircleRemove />,
      color: 'red',
      onClick: handleDelete,
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ]
  );

  export const actionsEmployeesActivitiesContainer = (handleShowActivities) => ([
      {
        label: 'عرض',
        icon: <FaEye />,
        color: '#289FBF',
        onClick: handleShowActivities
      }
    ]);


 export const actionsOrdersContainer = ( handleShowEdit , handleShowConfirmed ) =>  ([
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleShowEdit(row.id)
    },
    {
      label: 'تأكيد',
      icon: <GiConfirmed />,
      color: 'green',
      onClick: (row) => handleShowConfirmed(row.id)
    }
  ])

 export const actionsPaymentsContainer = (handleShowPayment , handleDownload , isFetching , loading) => [
    {
      label: 'عرض',
      icon: <HiOutlineInformationCircle />,
      color: 'orange',
      onClick: handleShowPayment
    },
    {
      label: 'كشف حساب',
      icon: <FaDownload />,
      color: 'blue',
      onClick: handleDownload,
      disabled: isFetching || loading
    }
  ];