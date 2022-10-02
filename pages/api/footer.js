
export default function handler(req, res) {
  res.status(200).json([
    {
      title: "Seputar BRIK",
      items: [
        {
          title: "Beranda",
          href: "/customer-service/beranda"
        },
        {
          title: "Produk",
          href: "/customer-service/produk"
        },
        {
          title: "Tentang Kami",
          href: "/customer-service/tentang-kami"
        },
        {
          title: "Kontak Kami",
          href: "/customer-service/kontak-kami"
        }
      ]
    },
    {
      title: "Informasi",
      items: [
        {
          title: "FAQ",
          href: "/customer-service/faq"
        },
        {
          title: "Syarat & Ketentuan",
          href: "/customer-service/syarat-and-ketentuan"
        },
        {
          title: "Kebijakan Privasi",
          href: "/customer-service/kebijakan-privasi"
        },
      ]
    }
  ])
}
