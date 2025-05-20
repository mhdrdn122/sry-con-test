export const userFields = [
  { name: "name", label: "الاسم", dir: "rtl" },
  { name: "email", label: "الايميل" },
  { name: "company_name", label: "اسم الشركة" },
  { name: "phone", label: "رقم الهاتف" },
  { name: "address", label: "العنوان" },
  { name: "registration_number", label: "رقم السجل التجاري" },
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