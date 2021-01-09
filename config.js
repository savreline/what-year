import confidental from './confidental';
const env = process.env;

export const nodeEnv = env.NODE_ENV || 'develop';
export default { // 'mongodb://localhost:27017/what-year'
  mongodbUri: confidental.mongodbUri,
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
