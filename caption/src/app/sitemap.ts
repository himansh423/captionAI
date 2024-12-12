import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2024-12-09T06:42:54+00:00');
  return [
    {
      url: 'https://www.booleanix.com/privacy-policy',
      lastModified,
      priority: 1,
    },
    {
      url: 'https://www.booleanix.com/terms-and-conditions',
      lastModified,
      priority: 0.8,
    },
    {
      url: 'https://www.booleanix.com/contact-us',
      lastModified,
      priority: 0.8,
    },
  ];
}
