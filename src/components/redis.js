const redis = require("ioredis");

function Redis() {

  const conn = {

    port: process.env.REDIS_PORT,

    host: process.env.REDIS_URL,

    password: process.env.REDIS_PSW

  }

  return new redis(conn);

}

export default Redis;
