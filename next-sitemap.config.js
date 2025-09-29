module.exports = {
  siteUrl: 'https://cropsimage.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
  // Ensure all routes are included in the sitemap
  additionalPaths: async config => {
    return [
      // Main pages
      await config.transform(config, '/'),
      await config.transform(config, '/resize-image'),

      // Social media crop tools
      await config.transform(config, '/facebook'),
      await config.transform(config, '/instagram'),
      await config.transform(config, '/linkedin'),
      await config.transform(config, '/pinterest'),
      await config.transform(config, '/tiktok'),
      await config.transform(config, '/twitter'),
      await config.transform(config, '/youtube'),

      // Legal pages
      await config.transform(config, '/cookie-policy'),
      await config.transform(config, '/privacy-policy'),
      await config.transform(config, '/terms-of-use'),
    ];
  },
  // Optimize for SEO
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 50000,
};
