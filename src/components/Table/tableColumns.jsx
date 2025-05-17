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


export const  getColumnsAdminsContainer = [
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

export  const getColumnsContractContainer = [
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