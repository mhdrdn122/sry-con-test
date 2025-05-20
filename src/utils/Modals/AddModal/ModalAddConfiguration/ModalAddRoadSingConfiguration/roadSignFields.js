export const roadSignFields = [
  { name: "region", label: "المنطقة", dir: "rtl" },
  { name: "city", label: "المدينة" },
  { name: "place", label: "مكان التموضع" },
  { name: "direction", label: "الاتجاه" },
  { name: "printing_price", label: "سعر الطباعة" },
  { name: "signs_number", label: "عدد اللوحات" },
  { name: "number_of_faces", label: "عدد الوجوه" },
  { name: "meters_number", label: "عدد الأمتار" },
  { name: "meters_number_printing", label: "عدد أمتار الطباعة" },
  {
    name: "coding_id",
    label: "النموذج",
    type: "select",
    dataKey: "codings",
    valueKey: "id",
    displayKey: "model",
  },
  {
    name: "status",
    label: "الحالة",
    type: "select",
    options: [
      { value: "قيد الإنشاء", label: "قيد الإنشاء" },
      { value: "متاح", label: "متاح" },
    ],
  },
];