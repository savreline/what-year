const env = process.env;

export const nodeEnv = env.NODE_ENV || 'develop';
export default {
  port: env.PORT || 8080
};
