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
        type: "input"
      },
      "1": {
        name: "Password",
        type: "password",
        required: true,
        id: "password",
        label: "Password",
        fullWidth: true,
        type: "input"
      },
    }
  })
}
