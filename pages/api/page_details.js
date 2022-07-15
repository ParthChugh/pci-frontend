
export default function handler(req, res) {
  res.status(200).json({
    footer: [
      {
        title: "Market Place",
        items: [
          {
            title: "All NFts",
            href: "/search?q=nfts"
          },
          {
            title: "Art",
            href: "/search?q=art"
          },
          {
            title: "Collectibles",
            href: "/search?q=collectibles"
          },
          {
            title: "Domain Names",
            href: "/search?q=domain+names"
          },
          {
            title: "Music",
            href: "/search?q=music",
          },
          {
            title: "Photogrpahy",
            href: "/search?q=photogrpahy",
          },
          {
            title: "Virtual Cards",
            href: "/search?q=virtual+cards",
          },
          {
            title: "Trading Cards",
            href: "/search?q=trading+cards",
          },
          {
            title: "Utilities",
            href: "/search?q=utilities",
          }
        ]
      },
      {
        title: "My Account",
        items: [
          {
            title: "Profile",
            href: "/profile"
          },
          {
            title: "My Favorurites",
            href: "/my+favorurites"
          },
          {
            title: "My Collection",
            href: "/my+collection"
          },
          {
            title: "Settings",
            href: "/settings"
          }
        ]
      },
      {
        title: "Resources",
        items: [
          {
            title: "Help Center",
            href: "/help"
          },
          {
            title: "Platform Status",
            href: "/help/platform-status"
          },
          {
            title: "Gas-Free Marketplace",
            href: "/help/gas-free-Marketplace"
          },
          {
            title: "Blog",
            href: "/help/blog"
          },
          {
            title: "Docs",
            href: "/help/docs"
          },
          {
            title: "Newsletter",
            href: "/help/newsletter"
          },
        ]
      },
      {
        title: "Company",
        items: [
          {
            title: "About",
            href: "/help/about"
          },
          {
            title: "Careers",
            href: "/help/careers"
          },
        ]
      }
    ],
    header: {
      "logo": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
      "name": "Open Throne",
      "header_types": {
        "texts": [
          {
            "name": "Resources",
            "isDropdown": true,
            "types": [
              {
                "name": "Help Center",
                "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
                "href": "/help/center/",
                "tooltip": "Help Center"
              },
              {
                "name": "Platform Status",
                "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
                "href": "/help/platform-status/",
                "tooltip": "Platform Status"
              }
            ]
          },
          {
            "name": "Explore",
            "href": "products/"
          }
        ],
        "icons": [
          {
            "name": "Profile",
            "href": "profile/",
            "tooltip": "Profile check",
            "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png"
          },
          {
            "name": "Wallet",
            "href": "walltet/",
            "tooltip": "Wallet",
            "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png"
          }
        ]
      }
    }
  })
}
