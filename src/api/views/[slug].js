import client from 'lib/redis';
const redis = client();

export default async (req, res) => {
  const redis = client();
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  let members = [];
  await redis
    .pipeline()
    .sadd(req.query.slug, ip)
    .smembers(req.query.slug)
    .exec((err, results) => {
      members = results[1][1];
    });
  redis.quit();
  const n = members.length;
  return res.status(200).json({
    total: n
  });
};
