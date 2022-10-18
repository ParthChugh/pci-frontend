// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "button": "Simpan",
    form: {
      "0": {
        name: "Nama",
        required: true,
        id: "fullName",
        autoComplete: "given-name",
        label: "",
        fullWidth: true,
        fieldType: "input"
      },
      "1": {
        name: "Posisi",
        id: "position",
        autoComplete: "postion",
        label: "",
        fullWidth: true,
        fieldType: "input",
      },
      "2": {
        name: "No. Telepon",
        required: true,
        id: "phone",
        autoComplete: "given-name",
        label: "",
        fullWidth: true,
        fieldType: "input",
        type: "number"
      },
      "3": {
        name: "Email",
        required: true,
        autoComplete: "email",
        fullWidth: true,
        id: "email",
        label: "",
        fieldType: "input",
        inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
      },
    }
  })
}
