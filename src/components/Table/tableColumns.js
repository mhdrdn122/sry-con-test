import React from 'react';

export const tableColumns = {
  // RoadSignsContainer
  roadSignsColumns: [
    { key: 'id', label: 'رقم اللوحة', align: 'center' },
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'category', label: 'الصنف', align: 'center' },
    { key: 'price', label: 'السعر', align: 'center' },
    { key: 'region', label: 'المنطقة', align: 'center' },
    { key: 'place', label: 'الموقع', align: 'center' },
    { key: 'size', label: 'الحجم', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => (row.status === 1 ? 'محجوز' : 'غير محجوز')
    }
  ],

  // AdminsContainer
  adminsColumns: [
    { key: 'id', label: 'المعرف', align: 'center' },
    { key: 'name', label: 'اسم المشرف', align: 'center' },
    { key: 'email', label: 'البريد الإلكتروني', align: 'center' },
    { key: 'phone', label: 'رقم الهاتف', align: 'center' }
  ],

  // UsersContainer
  usersColumns: [
    { key: 'id', label: 'المعرف', align: 'center' },
    { key: 'name', label: 'اسم العميل', align: 'center' },
    { key: 'email', label: 'البريد الإلكتروني', align: 'center' },
    { key: 'phone', label: 'رقم الهاتف', align: 'center' }
  ],

  // CodingContainer
  codingColumns: [
    { key: 'id', label: 'رقم اللوحة', align: 'center' },
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'category', label: 'الصنف', align: 'center' },
    { key: 'price', label: 'السعر', align: 'center' },
    { key: 'region', label: 'المنطقة', align: 'center' },
    { key: 'place', label: 'الموقع', align: 'center' },
    { key: 'size', label: 'الحجم', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => (row.status === 1 ? 'محجوز' : 'غير محجوز')
    }
  ],

  // AddReservationContainer
  addReservationColumns: [
    { key: 'id', label: 'رقم اللوحة', align: 'center' },
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'category', label: 'الصنف', align: 'center' },
    { key: 'price', label: 'السعر', align: 'center' },
    { key: 'region', label: 'المنطقة', align: 'center' },
    { key: 'place', label: 'الموقع', align: 'center' },
    { key: 'size', label: 'الحجم', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => (row.status === 1 ? 'محجوز' : 'غير محجوز')
    }
  ],

  // ReservationsContainer
  reservationsColumns: [
    { key: 'road_sign_region', label: 'عنوان اللوحة', align: 'center' },
    { key: 'road_sign_place', label: 'تموضع اللوحة', align: 'center' },
    { key: 'start_date', label: 'من', align: 'center' },
    { key: 'end_date', label: 'إلى', align: 'center' },
    { key: 'company_name', label: 'اسم الشركة', align: 'center' }
  ],

  // OrdersContainer
  ordersColumns: [
    { key: 'id', label: 'رقم الطلب', align: 'center' },
    { key: 'company_name', label: 'اسم الشركة', align: 'center' },
    { key: 'road_sign_id', label: 'رقم اللوحة', align: 'center' },
    { key: 'start_date', label: 'تاريخ البدء', align: 'center' },
    { key: 'end_date', label: 'تاريخ الانتهاء', align: 'center' },
    {
      key: 'status',
      label: 'حالة الطلب',
      align: 'center',
      render: (row) => {
        switch (row.status) {
          case 'pending':
            return 'معلق';
          case 'confirmed':
            return 'مؤكد';
          case 'cancelled':
            return 'ملغى';
          default:
            return '...';
        }
      }
    }
  ],

  // PaymentsContainer
  paymentsColumns: [
    { key: 'id', label: 'رقم الدفعة', align: 'center' },
    { key: 'company_name', label: 'اسم الشركة', align: 'center' },
    {
      key: 'amount',
      label: 'المبلغ',
      align: 'center',
      render: (row) => `${row.amount} ريال`
    },
    { key: 'payment_date', label: 'تاريخ الدفع', align: 'center' },
    { key: 'payment_method', label: 'طريقة الدفع', align: 'center' },
    {
      key: 'status',
      label: 'حالة الدفعة',
      align: 'center',
      render: (row) => {
        switch (row.status) {
          case 'pending':
            return 'معلق';
          case 'completed':
            return 'مكتمل';
          case 'failed':
            return 'فشل';
          default:
            return '...';
        }
      }
    }
  ],

  // ContractContainer
  contractColumns: [
    { key: 'company_name', label: 'اسم الشركة', align: 'center' },
    {
      key: 'start_date',
      label: 'تاريخ البدء',
      align: 'center',
      render: (row) => row.start_date || row.date || '...'
    },
    {
      key: 'end_date',
      label: 'تاريخ الانتهاء',
      align: 'center',
      render: (row) => row.end_date || '...'
    },
    {
      key: 'price',
      label: 'السعر',
      align: 'center',
      render: (row) => row.price || '...'
    },
    {
      key: 'discount',
      label: 'الحسم',
      align: 'center',
      render: (row) => (row.discount ? `${row.discount}%` : '...')
    }
  ],

  // ReportContainer
  reportColumns: (selectedReportType) => [
    ...(selectedReportType === 'reservation_this_week'
      ? [{ key: 'company_name', label: 'اسم الشركة', align: 'center' }]
      : []),
    { key: 'road_sign_region', label: 'المنطقة', align: 'center' },
    { key: 'road_sign_place', label: 'الموقع', align: 'center' },
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'signs_number', label: 'عدد اللوحات', align: 'center' },
    { key: 'number_of_faces', label: 'عدد الوجوه', align: 'center' },
    {
      key: 'meters_number',
      label: 'عدد الأمتار',
      align: 'center',
      render: (row) => row.meters_number || 'غير معرف'
    },
    ...(selectedReportType === 'all_data'
      ? [
          { key: 'signs_number_reservation', label: 'عدد اللوحات المحجوزة', align: 'center' },
          { key: 'number_of_faces_reservation', label: 'عدد الوجوه المحجوزة', align: 'center' }
        ]
      : [])
  ],

  // Box
  boxColumns: [
    {
      key: 'amount_received',
      label: 'المبلغ المقبوض',
      align: 'center',
      render: (row) => row.amount_received || '....'
    },
    {
      key: 'remaining_amount',
      label: 'المبلغ المتبقي',
      align: 'center',
      render: (row) => row.remaining_amount || '....'
    },
    {
      key: 'total',
      label: 'المجموع',
      align: 'center',
      render: (row) => row.total || '....'
    }
  ],

  // EmployeesActivitiesContainer
  employeesActivitiesColumns: [
    { key: 'description', label: 'العمل', align: 'center' },
    { key: 'created_at', label: 'تاريخه', align: 'center' },
    {
      key: 'causer_name',
      label: 'الفاعل',
      align: 'center',
      render: (row) => row.causer?.name || '...'
    }
  ]
};