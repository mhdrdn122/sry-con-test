import React from 'react';
import { FaEye, FaDownload, FaCheck, FaTimes, FaTrash, FaExchangeAlt } from 'react-icons/fa';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdAutorenew } from 'react-icons/md';
import { CiCircleRemove } from 'react-icons/ci';

export const tableActions = {
  // RoadSignsContainer
  roadSignsActions: (handleShow, isFetching, loading) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    }
  ],

  // AdminsContainer
  adminsActions: (handleShow, handleEdit, handleDelete, isFetching, loading) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    },
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleEdit(row),
      disabled: isFetching || loading
    },
    {
      label: 'حذف',
      icon: <DeleteIcon />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading
    }
  ],

  // UsersContainer
  usersActions: (handleShow, handleEdit, handleDelete, isFetching, loading) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    },
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleEdit(row),
      disabled: isFetching || loading
    },
    {
      label: 'حذف',
      icon: <DeleteIcon />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading
    }
  ],

  // CodingContainer
  codingActions: (handleShowEdit, handleShowDelete, superAdminInfo) => [
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleShowEdit(row)
    },
    ...(superAdminInfo?.role === 'super'
      ? [
          {
            label: 'حذف',
            icon: <DeleteIcon />,
            color: 'red',
            onClick: (row) => handleShowDelete(row.id)
          }
        ]
      : [])
  ],

  // ReservationsContainer
  ReservationsContainer: (handleShow, isFetching, loading) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    }
  ],

  // AddReservationContainer
  addReservationActions: (
    handleShow,
    handleEdit,
    handleDelete,
    handleConfirm,
    handleCancel, 
    isFetching,
    loading,
    superAdminInfo
  ) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    },
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleEdit(row),
      disabled: isFetching || loading
    },
    {
      label: 'تأكيد الحجز',
      icon: <FaCheck />,
      color: 'green',
      onClick: (row) => handleConfirm(row),
      disabled: isFetching || loading,
      condition: (row) => row.status === 'pending'
    },
    {
      label: 'إلغاء الحجز',
      icon: <FaTimes />,
      color: 'red',
      onClick: (row) => handleCancel(row),
      disabled: isFetching || loading,
      condition: (row) => row.status === 'pending'
    },
    {
      label: 'حذف الحجز',
      icon: <DeleteIcon />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ],

  // OrdersContainer
  ordersActions: (
    handleShow,
    handleEdit,
    handleDelete,
    handleConfirm,
    handleCancel,
    isFetching,
    loading,
    superAdminInfo
  ) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    },
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleEdit(row),
      disabled: isFetching || loading
    },
    {
      label: 'تأكيد الطلب',
      icon: <FaCheck />,
      color: 'green',
      onClick: (row) => handleConfirm(row),
      disabled: isFetching || loading,
      condition: (row) => row.status === 'pending'
    },
    {
      label: 'إلغاء الطلب',
      icon: <FaTimes />,
      color: 'red',
      onClick: (row) => handleCancel(row),
      disabled: isFetching || loading,
      condition: (row) => row.status === 'pending'
    },
    {
      label: 'حذف الطلب',
      icon: <DeleteIcon />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ],

  // PaymentsContainer
  paymentsActions: (handleShow, handleDelete, isFetching, loading, superAdminInfo) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShow(row),
      disabled: isFetching || loading
    },
    {
      label: 'حذف الدفعة',
      icon: <DeleteIcon />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ],

  // ContractContainer
  contractActions: (
    handleDownload,
    handleEdit,
    handleRenewalContract,
    handleDelete,
    isFetching,
    loading,
    superAdminInfo
  ) => [
    {
      label: 'تحميل',
      icon: <FaDownload />,
      color: 'blue',
      onClick: (row) => handleDownload(row),
      disabled: isFetching || loading
    },
    {
      label: 'تعديل الحسم',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleEdit(row),
      disabled: isFetching || loading
    },
    {
      label: 'تجديد عقد',
      icon: <MdAutorenew />,
      color: 'green',
      onClick: (row) => handleRenewalContract(row),
      disabled: isFetching || loading,
      condition: (row) => !!row.company_name
    },
    {
      label: 'حذف عقد',
      icon: <CiCircleRemove />,
      color: 'red',
      onClick: (row) => handleDelete(row),
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ],

  // ReportContainer
  reportActions: () => [],

  // Box
  boxActions: () => [],

  // EmployeesActivitiesContainer
  employeesActivitiesActions: (handleShowActivities) => [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: (row) => handleShowActivities(row)
    }
  ]
};