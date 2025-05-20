export const orderFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "note", label: "ملاحظة", type: "text", dir: "rtl" },
  {
    name: "date",
    label: "تاريخ البدء",
    type: "date",
    minDate: new Date().toISOString().split("T")[0],
  },
  {
    name: "road_sign_id",
    label: "عنوان اللوحة",
    type: "select",
    dataKey: "roadSigns",
    valueKey: "id",
    displayKey: "region",
    secondaryDisplayKey: "place",
  },
]; 