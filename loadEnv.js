// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config } = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
} else {
  config({ path: '.env.production' });
}