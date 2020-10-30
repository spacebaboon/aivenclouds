import { APIResponse } from '../components/CloudList';

export const sampleApiResponse: APIResponse = {
  clouds: [
    {
      name: 'google-asia-northeast2',
      description: 'Google Cloud: Osaka',
      region: 'east asia',
      distance: 8811,
    },
    {
      name: 'aws-eu-central-1',
      description: 'Amazon Web Services: Frankfurt',
      region: 'europe',
      distance: 479,
    },
    {
      name: 'azure-westcentralus',
      description: 'Azure: West Central US',
      region: 'north america',
      distance: 7960,
    },
  ],
};
