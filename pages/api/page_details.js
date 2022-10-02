
export default function handler(req, res) {
  res.status(200).json({
    footer: [
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
    ],
    header: {
      "logo": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
      "name": "",
      "icons": [
        {
          "name": "Masuk",
          "href": "/login",
          "isLoggedIn": false
        },
        {
          "name": "Wishlist",
          "href": "/wishlist",
          "icon": "/icons/love.svg",
          "isLoggedIn": true,
        },
        {
          "name": "Cart",
          "href": "/cart",
          "icon": "/icons/cart.svg",
          "isLoggedIn": true,
          "showBadge": true
        },
      ]
    }
  })
}
