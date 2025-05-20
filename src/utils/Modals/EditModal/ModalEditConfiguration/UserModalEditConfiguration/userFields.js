export const userFields = [
  { name: "id", label: "ID", type: "hidden" },
  { name: "name", label: "الاسم", type: "text", dir: "rtl" },
  { name: "email", label: "الايميل", type: "text", dir: "rtl" },
  { name: "company_name", label: "اسم الشركة", type: "text", dir: "rtl" },
  { name: "phone", label: "رقم الهاتف", type: "text", dir: "rtl" },
  { name: "address", label: "العنوان", type: "text", dir: "rtl" },
  {
    name: "registration_number",
    label: "رقم السجل التجاري",
    type: "text",
    dir: "rtl",
  },
  {
    name: "format",
    label: "نوع النموذج",
    type: "select", 
    options: [
      { value: "أجنبي", label: "أجنبي" },
      { value: "أجنبي سوري", label: "أجنبي سوري" },
      { value: "وطني سوري", label: "وطني سوري" },
    ],
  },
];