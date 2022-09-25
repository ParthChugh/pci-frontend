// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    tabType: 'stepper',
    tabs: [
      {
        clickDisabled: true,
        "button": "Submit",
        heading: "NPWP",
        extraFields: {
          "apiQuery": "type=npwp"
        },
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
            fieldType: "fileUpload",
          },
        }
      },
      {
        clickDisabled: true,
        "button": "Submit",
        heading: "SPPKP",
        extraFields: {
          "apiQuery": "type=sppkp"
        },
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
            name: "Pilih SPPKP",
            required: true,
            fullWidth: true,
            id: "file",
            label: "Pilih File",
            fieldType: "fileUpload",
          },
        },
      },
      {
        clickDisabled: true,
        "button": "Submit",
        heading: "NIB",
        extraFields: {
          "apiQuery": "type=nib"
        },
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
            fieldType: "fileUpload",
          },
        }
      }
    ]
  })
}
