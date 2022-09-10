
export default function handler(req, res) {
  res.status(200).json([
    {
      title: "Seputar BRIK",
      items: [
        {
          title: "Beranda",
          href: "/search?q=nfts"
        },
        {
          title: "Produk",
          href: "/search?q=art"
        },
        {
          title: "Tentang Kami",
          href: "/search?q=collectibles"
        },
        {
          title: "Kontak Kami",
          href: "/search?q=domain+names"
        }
      ]
    },
    {
      title: "Informasi",
      items: [
        {
          title: "FAQ",
          href: "/profile"
        },
        {
          title: "Syarat & Ketentuan",
          href: "/my+favorurites"
        },
        {
          title: "Kebijakan Privasi",
          href: "/my+collection"
        },i
      ]
    }
  ])
}
