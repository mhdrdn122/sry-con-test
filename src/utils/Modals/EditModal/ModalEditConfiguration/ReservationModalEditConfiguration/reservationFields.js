export const reservationFields = [
  { name: "id", label: "ID", type: "hidden" },
  {
    name: "road_sign_id",
    label: "عنوان اللوحة",
    type: "select",
    dataKey: "roadSigns",
    valueKey: "id",
    displayKey: "region",
    secondaryDisplayKey: "place",
  },
  { 
    name: "type",
    label: "مؤقت أو دائم",
    type: "select",
    options: [
      { value: "temporary", label: "مؤقت" },
      { value: "permanent", label: "دائم" },
    ],
  },
  {
    name: "start_date",
    label: "تاريخ البدء",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "end_date",
    label: "تاريخ النهاية",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "with_print",
    label: "مع طباعة",
    type: "select",
    options: [
      { value: 0, label: "لا" },
      { value: 1, label: "نعم" },
    ],
  },
  {
    name: "user_id",
    label: "المستخدم",
    type: "select",
    dataKey: "users",
    valueKey: "id",
    displayKey: "name",
  },
  { name: "number_of_faces", label: "عدد الوجوه", type: "text", dir: "rtl" },
  { name: "signs_number", label: "عدد اللوحات", type: "text", dir: "rtl" },
];