
export default function handler(req, res) {
  res.status(200).json({
    footer: [
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
