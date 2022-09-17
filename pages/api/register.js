// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    tabs: [
      {
        "button": "Daftar",
        heading: "Umum",
        form: {
          "0": {
            name: "Nama",
            required: true,
            id: "nama",
            autoComplete: "given-name",
            label: "Nama",
            fullWidth: true,
            type: "input"
          },
          "1": {
            name: "Email",
            required: true,
            autoComplete: "email",
            fullWidth: true,
            id: "email",
            label: "Email",
            type: "input"
          },
          "2": {
            name: "No. Telepon",
            required: true,
            id: "telepon",
            autoComplete: "given-name",
            label: "No. Telepon",
            fullWidth: true,
            type: "input"
          },
          "3": {
            name: "Password",
            type: "password",
            required: true,
            id: "password",
            label: "Password",
            fullWidth: true,
            type: "input"
          },
          "4": {
            name: "Kode Sales",
            required: true,
            id: "kode_sales",
            label: "Kode Sales",
            fullWidth: true,
            type: "input"
          },
        }
      },
      {
        "button": "Daftar",
        heading: "Bisnis",
        form: {
          "0": {
            name: "Nama Perusahaan",
            required: true,
            id: "nama_perusahaan",
            label: "Nama Perusahaan",
            fullWidth: true,
            type: "input"
          },
          "1": {
            name: "Nama PIC",
            required: true,
            id: "nama_pic",
            label: "Nama PIC",
            fullWidth: true,
            type: "input"
          },
          "2": {
            name: "Jenis Pengguna",
            required: true,
            id: "jenis_pengguna",
            label: "Jenis Pengguna",
            fullWidth: true,
            type: "input"
          },
          "3": {
            name: "No. Telepon",
            required: true,
            id: "telepon",
            label: "No. Telepon",
            fullWidth: true,
            type: "input"
          },
          "4": {
            name: "Password",
            type: "password",
            required: true,
            id: "password",
            label: "Password",
            fullWidth: true,
            type: "input"
          },
          "5": {
            name: "Kode Sales",
            required: true,
            id: "kode_sales",
            label: "Kode Sales",
            fullWidth: true,
            type: "input"
          }
        }
      }
    ]
  })
}
