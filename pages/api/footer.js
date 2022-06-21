
export default function handler(req, res) {
  res.status(200).json([
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
  ])
}
