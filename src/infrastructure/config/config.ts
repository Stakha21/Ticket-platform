export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
  },
  platformSettings: {
    serviceFeeRate: parseInt(process.env.SERVICE_FEE_RATE) || 0,
    minimumFee: parseInt(process.env.MINIMUM_FEE) || 0,
  },
});
