// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    tabs: [
      {
        "button": "Submit",
        heading: "NPWP",
        form: {
          "0": {
            name: "Nomor NPWP",
            required: true,
            id: "nomor-npwp",
            autoComplete: "nomor-npwp",
            label: "XX.XXX.XXX.X-XXX.XXX",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Pilih NPWP",
            required: true,
            fullWidth: true,
            id: "file",
            label: "Pilih File",
            fieldType: "input",
          },
        }
      },
      {
        "button": "Submit",
        heading: "SPPKP",
        form: {
          "0": {
            name: "Nomor SPPKP",
            required: true,
            id: "nomor-sppkp",
            autoComplete: "nomor-sppkp",
            label: "XXX-XXX/XXX.XX/XX.XXXX/XXXX",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Pilih NPWP",
            required: true,
            fullWidth: true,
            id: "file",
            label: "Pilih File",
            fieldType: "input",
          },
        },
      },
      {
        "button": "Submit",
        heading: "NIB",
        form: {
          "0": {
            name: "Nomor NIB",
            required: true,
            id: "nomor-sppkp",
            autoComplete: "nomor-sppkp",
            label: "XXXXXXXXXXXXXX",
            fullWidth: true,
            fieldType: "input"
          },
          "1": {
            name: "Pilih NIB",
            required: true,
            fullWidth: true,
            id: "file",
            label: "Pilih File",
            fieldType: "input",
          },
        }
      }
    ]
  })
}
