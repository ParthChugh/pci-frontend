// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "button": "Masuk",
    form: {
      "0": {
        name: "Email",
        required: true,
        autoComplete: "email",
        fullWidth: true,
        id: "email",
        label: "Email",
        fieldType: "input",
        inputProps: { pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$" }
      },
      "1": {
        name: "Password",
        fieldType: "password",
        required: true ,
        id: "password",
        label: "Password",
        fullWidth: true,
        fieldType: "input",
        type: "password",
        inputProps: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$" }
      },
    }
  })
}
