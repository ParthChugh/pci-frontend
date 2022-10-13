
export default function handler(req, res) {
  res.status(200).json({
    button: "Add Address",
    form: {
      "0": {
        name: "Name",
        fieldType: "name",
        required: true,
        id: "name",
        label: "Name",
        fullWidth: true,
        fieldType: "input",
      },
      "1": {
        name: "Address Line 1",
        fieldType: "line1",
        required: true,
        id: "line1",
        label: "Address Line 1",
        fullWidth: true,
        fieldType: "searchDropdown",
        autoFill: {
          api: "/v1/address/?search=${text}&size=10",
        }
      },
      "2": {
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