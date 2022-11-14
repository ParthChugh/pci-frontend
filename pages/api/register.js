// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    tabType: 'tab',
    tabs: [
      {
        "button": "Daftar",
        heading: "Umum",
        extraFields: {
          "apiQuery": "uType=customer",
          "redirect": "/"
        },
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
            name: "Email",
            required: true,
            autoComplete: "email",
            fullWidth: true,
            id: "email",
            label: "",
            fieldType: "input",
            inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
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
            name: "Password",
            fieldType: "password",
            required: true,
            id: "password",
            label: "",
            fullWidth: true,
            fieldType: "input",
            type: "password",
            inputProps: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$" }
          },
          "4": {
            name: "Kode Sales",
            required: false,
            id: "referralCode",
            label: "",
            fullWidth: true,
            fieldType: "input"
          },
        }
      },
      {
        "button": "Daftar",
        heading: "Bisnis",
        extraFields: {
          "apiQuery": "uType=architecture",
          "redirect": "/business-verification"
        },
        form: {
          "0": {
            name: "Nama Perusahaan",
            required: true,
            id: "nameCompany",
            label: "",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Nama PIC",
            required: true,
            id: "fullName",
            label: "",
            fullWidth: true,
            fieldType: "input"
          },
          "2": {
            name: "Email",
            required: true,
            autoComplete: "email",
            fullWidth: true,
            id: "email",
            label: "",
            fieldType: "input",
            inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
          },
          "3": {
            name: "Jenis Pengguna",
            required: true,
            id: "uType",
            label: "",
            fullWidth: true,
            fieldType: "dropdown",
            options: [
              { label: "Pemilik Proyek", value: "Pemilik Proyek" },
              { label: "Kontraktor", value: "Kontraktor" },
              { label: "Lainnya", value: "Lainnya" },
            ]
          },
          "4": {
            name: "No. Telepon",
            required: true,
            id: "phone",
            label: "",
            fullWidth: true,
            fieldType: "input"
          },
          "5": {
            name: "Password",
            fieldType: "password",
            required: true,
            id: "password",
            label: "",
            fullWidth: true,
            fieldType: "input",
            type: "password",
            inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
          },
          "6": {
            name: "Kode Sales",
            required: false,
            id: "referralCode",
            label: "",
            fullWidth: true,
            fieldType: "input"
          }
        }
      }
    ]
  })
}
