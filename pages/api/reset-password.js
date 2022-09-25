// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "button": "Kirim kode",
    extraFields: {
      "apiQuery": "uType=forgot"
    },
    form: {
      "0": {
        name: "Email",
        required: true,
        autoComplete: "email",
        fullWidth: true,
        id: "email",
        label: "Email",
        fieldType: "input"
      }
    },
    otp: {
      extraFields: {
        "apiQuery": "uType=otp"
      },
      numInputs: 6,
      "button": "Verifikasi kode",
      otpResendTime: 60
    }
  })
}
