// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "button": "Simpan",
    defaultValue: "cash-before-delivery",
    form: {
      "0": {
        name: "Tipe Pembayaran",
        required: true,
        fullWidth: true,
        id: "modeOfPayment",
        fieldType: "singleSelect",
        defaultValue: "cash-before-delivery",
        options: [
          {
            label: "Cash Before Delivery",
            value: "cash-before-delivery",
          },
          {
            label: "Term of Payment - 3 Hari",
            value: "term-of-payment-3",
            disabled: true,
            errorMessage: "Lakukan Credit Assesment untuk menggunakan fitur ini."
          },
          {
            label: "Term of Payment - 14 Hari",
            value: "term-of-payment-14",
            disabled: true,
            errorMessage: "Lakukan Credit Assesment untuk menggunakan fitur ini."
          }
        ]
      },
    }
  })
}
