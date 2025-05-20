export const cashPaymentFields = [
  { name: "amount_paid", label: "المبلغ المراد دفعه" },
  {
    name: "code",
    label: "الكود",
    type: "select",
    dataKey: "codings",
    valueKey: "code",
    displayKey: "code",
  },
  { name: "image", label: "صورة الإيصال", type: "file", accept: "image/*" },
];