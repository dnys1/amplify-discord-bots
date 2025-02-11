export const staticCommandsData = {
  github: {
    description: 'Get links for AWS Amplify GitHub repositories',
    return: 'https://github.com/aws-amplify',
    options: [
      {
        name: 'repository',
        description: 'The AWS Amplify repository',
        type: 3,
        required: true,
        choices: [
          {
            name: 'admin-ui',
            value: 'amplify-adminui',
            return: 'https://github.com/aws-amplify/amplify-adminui',
          },
          {
            name: 'cli',
            value: 'amplify-cli',
            return: 'https://github.com/aws-amplify/amplify-cli',
          },
          {
            name: 'console',
            value: 'amplify-console',
            return: 'https://github.com/aws-amplify/amplify-console',
          },
          {
            name: 'js',
            value: 'amplify-js',
            return: 'https://github.com/aws-amplify/amplify-js',
          },
          {
            name: 'docs',
            value: 'docs',
            return: 'https://github.com/aws-amplify/docs',
          },
        ],
      },
    ],
  },
}
