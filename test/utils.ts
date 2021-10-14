export function getApiKey(): string {
  const param = process.argv.find((arg) => {
    return arg.startsWith('--apikey=');
  });

  if (!param) {
    throw new Error(
      'parameter apikey not found. Run "npm run <script> -- --apikey=value"',
    );
  }

  return param.split('=')[1];
}
