/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Camping API",
  tagline: "Dinosaurs are cool",
  url: "https://github.com/mi-kas/camping-api",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "mi-kas",
  projectName: "camping-api",
  themeConfig: {
    navbar: {
      title: "Camping API",
      logo: {
        alt: "Camping API Logo",
        src: "img/logo.svg"
      },
      items: [
        { to: "/docs/api", label: "Docs", position: "left" },
        {
          href: "https://github.com/mi-kas/camping-api",
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
          editUrl: "https://github.com/mi-kas/camping-api/edit/main/docs/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
