/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Open Camping API",
  tagline:
    "Open REST API to search for your next camping/campsite/campground nearby",
  url: "https://github.com/mi-kas/open-camping-api",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "mi-kas",
  projectName: "open-camping-api",
  themeConfig: {
    navbar: {
      title: "Open Camping API",
      logo: {
        alt: "Open Camping API Logo",
        src: "img/logo.svg"
      },
      items: [
        { to: "/docs/api", label: "Docs", position: "left" },
        {
          href: "https://github.com/mi-kas/open-camping-api",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Camping API. Built with Docusaurus.`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/mi-kas/open-camping-api/edit/main/docs/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
