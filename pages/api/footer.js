
export default function handler(req, res) {
  res.status(200).json([
    {
      title: "Seputar BRIK",
      items: [
        {
          title: "Beranda",
          href: "/"
        },
        {
          title: "Produk",
          href: "/products"
        },
        {
          title: "Tentang Kami",
          href: "/about"
        },
        {
          title: "Kontak Kami",
          href: "/contact"
        }
      ]
    },
    {
      title: "Informasi",
      items: [
        {
          title: "FAQ",
          href: "/faq"
        },
        {
          title: "Syarat & Ketentuan",
          href: "/t-n-c"
        },
        {
          title: "Kebijakan Privasi",
          href: "/privacy"
        },
      ]
    }
  ])
}
