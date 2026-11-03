// Public website configuration. Never put credentials in this file.
export default {
  name: 'Rohlfing Labs',
  // Production canonical domain. SITE_URL can override it for a separate host.
  url: process.env.SITE_URL || 'https://rohlfinglabs.com/',
  // Public business contact. Use CONTACT_EMAIL to override it at build time.
  // Set email to null to deliberately show the pre-launch placeholder instead.
  email: process.env.CONTACT_EMAIL || 'rohlfinglabs@gmail.com',
  headshot: 'assets/austin-rohlfing.webp',
};
