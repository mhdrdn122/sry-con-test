import { IconButton, Tooltip } from "@mui/material";
import { LiaFileContractSolid } from "react-icons/lia";
import { MdEditLocationAlt } from "react-icons/md";
import { RiContractLine } from "react-icons/ri";
import { TbContract } from "react-icons/tb";


export const getColumnsAddReservationContainer = (selectedSigns, handleStatusClick) => [
  { key: 'coding.model', label: 'نموذج', align: 'center' },
  { key: 'signs_number', label: 'عدد اللوحات', align: 'center' },
  { key: 'number_of_faces', label: 'عدد الأوجه', align: 'center' },
  { key: 'meters_number', label: 'عدد الأمتار', align: 'center' },
  {
    key: 'coding.size',
    label: 'القياس',
    align: 'center',
    render: (row) => `${row.coding.size} / ${row.coding.type}`
  },
  { key: 'region', label: 'المنطقة', align: 'center' },
  { key: 'place', label: 'مكان التموضع', align: 'center' },
  { key: 'direction', label: 'الاتجاه', align: 'center' },
  {
    key: 'status',
    label: 'الحالة',
    align: 'center',
    render: (row) => (
      <td className="d-flex justify-center items-center badge badge-primary text-white" style={{ gap: "5px" }}>
        <p
          style={{
            backgroundColor: selectedSigns.find((sign) => sign.id === row.id) ? "red" : "green",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
            opacity: selectedSigns.find((sign) => sign.id === row.id) ? 0.6 : 1,
          }}
          onClick={() => handleStatusClick(row)}
        >
          {selectedSigns.find((sign) => sign.id === row.id) ? (
            <span className='d-flex'>✅ مضاف</span>
          ) : (
            `متاح/${row.total_faces_available}`
          )}
        </p>
        <p style={{ backgroundColor: "orange", padding: "10px", borderRadius: "10px" }}>
          محجوز/{row.total_faces_in_reservations}
        </p>
      </td>
    )
  }
];


export const getColumnsAdminsContainer = [
  { key: 'name', label: 'الاسم', align: 'center' },
  { key: 'username', label: 'اسم الأدمن', align: 'center' },
  {
    key: 'address',
    label: 'العنوان',
    align: 'center',
    render: (row) => row.address || '...'
  },
  { key: 'role', label: 'roles', align: 'center' }
];


export const getColumnsCodingContainer = [
  { key: 'model', label: 'النموذج', align: 'center' },
  { key: 'type', label: 'النوع', align: 'center' },
  { key: 'size', label: 'الحجم', align: 'center' },
  { key: 'price', label: 'السعر', align: 'center' },
  { key: 'format', label: 'نوع النموذج', align: 'center' }
];

export const getColumnsContractContainer = [
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
    render: (row) => row.discount ? `${row.discount}%` : '...'
  }
];

export const getColumnsEmployeesActivitiesContainer = [
  { key: 'description', label: 'العمل', align: 'center' },
  { key: 'created_at', label: 'تاريخه', align: 'center' },
  {
    key: 'causer_name',
    label: 'الفاعل',
    align: 'center',
    render: (row) => row.causer?.name || '...'
  }
];

export const getColumnsOrdersContainer = [
  { key: 'region', label: 'عنوان اللوحة', align: 'center' },
  { key: 'place', label: 'تموضع اللوحة', align: 'center' },
  { key: 'company_name', label: 'اسم الشركة', align: 'center' },
  {
    key: 'type',
    label: 'نوع الطلب',
    align: 'center',
    render: (row) => row.type === 'installation' ? 'تركيب' : 'فك'
  },
  { key: 'date', label: 'تاريخ الفك أو التركيب', align: 'center' },
  { key: 'note', label: 'الملاحظة', align: 'center' },
  {
    key: 'status',
    label: 'الحالة',
    align: 'center',
    render: (row) => row.status === 'done' ? '✅' : '⏳'
  }
];

export const getColumnsPaymentsContainer = [
  { key: 'company_name', label: 'اسم الشركة', align: 'center' },
  { key: 'company_code', label: 'الكود', align: 'center' },
  { key: 'total', label: 'المبلغ الكلي', align: 'center' },
  { key: 'amount_paid', label: 'المبلغ المدفوع', align: 'center' },
  { key: 'remaining_amount', label: 'المبلغ الباقي', align: 'center' }
];

export const getColumnsReportContainer = (selectedReportType) => ([
  ...(selectedReportType === 'reservation_this_week' ? [{
    key: 'company_name',
    label: 'اسم الشركة',
    align: 'center'
  }] : []),
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
  ...(selectedReportType === 'all_data' ? [
    { key: 'signs_number_reservation', label: 'عدد اللوحات المحجوزة', align: 'center' },
    { key: 'number_of_faces_reservation', label: 'عدد الوجوه المحجوزة', align: 'center' }
  ] : []),
]);

export const getColumnsReservationsContainer = [
  { key: 'road_sign_region', label: 'عنوان اللوحة', align: 'center' },
  { key: 'road_sign_place', label: 'تموضع اللوحة', align: 'center' },
  { key: 'start_date', label: 'من', align: 'center' },
  { key: 'end_date', label: 'إلى', align: 'center' },
  { key: 'company_name', label: 'اسم الشركة', align: 'center' }
];


export const getColumnsRoadSignContainer = [
    { key: 'coding.model', label: 'نموذج', align: 'center' },
    { key: 'signs_number', label: 'عدد اللوحات', align: 'center' },
    { key: 'number_of_faces', label: 'عدد الأوجه', align: 'center' },
    { key: 'meters_number', label: 'عدد الأمتار', align: 'center' },
    { key: 'meters_number_printing', label: 'عدد أمتار الطباعة', align: 'center' },
    { 
      key: 'coding.size', 
      label: 'القياس', 
      align: 'center',
      render: (row) => `${row.coding.size} / ${row.coding.type}`
    },
    { key: 'region', label: 'المنطقة', align: 'center' },
    { key: 'place', label: 'مكان التموضع', align: 'center' },
    { key: 'direction', label: 'الاتجاه', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => (
        <td 
          className="badge badge-primary p-2 text-white"
          style={{ backgroundColor: row.color }}
        >
          {row.color === "gold"
            ? row.status
            : row.reservations.length > 0
              ? `محجوز/${row.total_faces_in_reservations}`
              : "متاح"}
        </td>
      )
    }
  ];

export  const getColumnsUsersContainer = ( handleShowContract , handleShowOffer , downloadContract , navigate  ) =>( [
    {
      key: 'name',
      label: 'الاسم',
      align: 'center',
      render: (row) => row.name || '....'
    },
    {
      key: 'email',
      label: 'الايميل',
      align: 'center',
      render: (row) => row.email || '....'
    },
    {
      key: 'company_name',
      label: 'اسم الشركة',
      align: 'center',
      render: (row) => row.company_name || '....'
    },
    {
      key: 'phone',
      label: 'رقم الهاتف',
      align: 'center',
      render: (row) => row.phone || '....'
    },
    {
      key: 'code',
      label: 'الكود',
      align: 'center',
      render: (row) => row.code || '....'
    },
    {
      key: 'contracts',
      label: 'العقود',
      align: 'center',
      render: (row) => (
        <>
          <Tooltip placement='top-start' title="إنشاء عقد">
            <IconButton
              sx={{ color: "#FC9A08" }}
              onClick={() => handleShowContract(row)}
            >
              <TbContract />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="عرض مالي">
            <IconButton
              sx={{ color: "#F35A5B" }}
              onClick={() => handleShowOffer(row)}
            >
              <LiaFileContractSolid />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="نموذج تموضع اللوحات">
            <IconButton
              sx={{ color: "blue" }}
              onClick={() => downloadContract(row)}
            >
              <MdEditLocationAlt />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="كافة العقود">
            <IconButton
              sx={{ color: "#47B149" }}
              onClick={() => navigate(`/super_admin/users/${row.id}`)}
            >
              <RiContractLine />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ]);


  export  const getColumnsBoxContainer = [
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
  ];