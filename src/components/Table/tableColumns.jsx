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