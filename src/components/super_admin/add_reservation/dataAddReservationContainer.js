 // Form field configuration
export const formFields = [
  {
    id: 'start_date',
    name: 'start_date',
    label: 'تاريخ البدء',
    type: 'date',
  },
  {
    id: 'end_date',
    name: 'end_date',
    label: 'تاريخ النهاية',
    type: 'date',
  },
  {
    id: 'type',
    name: 'type',
    label: 'مؤقت أو دائم',
    type: 'select',
    options: [
      { value: 'temporary', label: 'مؤقت' },
      { value: 'permanent', label: 'دائم' },
    ],
  },
  {
    id: 'user_id',
    name: 'user_id',
    label: 'المستخدم',
    type: 'select',
    dynamicOptions: true,
  },
];