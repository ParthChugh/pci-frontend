// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    tabs: [
      {
        "button": "Daftar",
        heading: "Umum",
        extraFields: {
          "apiQuery": "uType=customer"
        },
        form: {
          "0": {
            name: "Nama",
            required: true,
            id: "fullName",
            autoComplete: "given-name",
            label: "Nama",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Email",
            required: true,
            autoComplete: "email",
            fullWidth: true,
            id: "email",
            label: "Email",
            fieldType: "input",
            inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
          },
          "2": {
            name: "No. Telepon",
            required: true,
            id: "phone",
            autoComplete: "given-name",
            label: "No. Telepon",
            fullWidth: true,
            fieldType: "input",
            type: "number"
          },
          "3": {
            name: "Password",
            fieldType: "password",
            required: true,
            id: "password",
            label: "Password",
            fullWidth: true,
            fieldType: "input",
            type: "password",
            inputProps: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$" }
          },
          "4": {
            name: "Kode Sales",
            required: false,
            id: "referralCode",
            label: "Kode Sales",
            fullWidth: true,
            fieldType: "input"
          },
        }
      },
      {
        "button": "Daftar",
        heading: "Bisnis",
        extraFields: {
          "apiQuery": "uType=company"
        },
        form: {
          "0": {
            name: "Nama Perusahaan",
            required: true,
            id: "nama_perusahaan",
            label: "nameCompany",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Nama PIC",
            required: true,
            id: "fullName",
            label: "Nama PIC",
            fullWidth: true,
            fieldType: "input"
          },
          "2": {
            name: "Jenis Pengguna",
            required: true,
            id: "uType",
            label: "Jenis Pengguna",
            fullWidth: true,
            fieldType: "dropdown",
            options: [
              { label: "Pemilik Proyek", value: "Pemilik Proyek" },
              { label: "Kontraktor", value: "Kontraktor" },
              { label: "Lainnya", value: "Lainnya" },
            ]
          },
          "3": {
            name: "No. Telepon",
            required: true,
            id: "telepon",
            label: "phone",
            fullWidth: true,
            fieldType: "input"
          },
          "4": {
            name: "Password",
            fieldType: "password",
            required: true,
            id: "password",
            label: "Password",
            fullWidth: true,
            fieldType: "input",
            inputProps: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$" }
          },
          "5": {
            name: "Kode Sales",
            required: false,
            id: "referralCode",
            label: "Kode Sales",
            fullWidth: true,
            fieldType: "input"
          }
        }
      }
    ]
  })
}
