module.exports = {
  siteUrl: 'https://cropsimage.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/resize-image' },
    ],
  },
};
