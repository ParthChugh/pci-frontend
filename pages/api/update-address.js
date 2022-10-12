
export default function handler(req, res) {
  res.status(200).json({
    button: "Update Address",
    form: {
      "0": {
        name: "Postal Id",
        required: true,
        autoComplete: "postalid",
        fullWidth: true,
        id: "PostalId",
        label: "Postal Id",
        fieldType: "input",
        type: "number",
        disabled: true
      },
      "1": {
        name: "Address Line 1",
        fieldType: "line1",
        required: true,
        id: "line1",
        label: "Address Line 1",
        fullWidth: true,
        fieldType: "input",
        disabled: true
      },
      "2": {
        name: "Name",
        fieldType: "name",
        required: true,
        id: "name",
        label: "Name",
        fullWidth: true,
        fieldType: "input",
      },
     
      "3": {
        name: "Address Line 2",
        fieldType: "line2",
        id: "line2",
        label: "Address Line 2",
        fullWidth: true,
        fieldType: "input",
      },

    }
  })
}