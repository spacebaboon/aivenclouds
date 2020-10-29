import { APIResponse } from '../components/CloudList';

export const sampleApiResponse: APIResponse = {
  clouds: [
    { name: 'Google Cloud: Osaka', region: 'east asia', distance: 8811 },
    {
      name: 'Amazon Web Services: Frankfurt',
      region: 'europe',
      distance: 479,
    },
    {
      name: 'Azure: West Central US',
      region: 'north america',
      distance: 7960,
    },
  ],
};
