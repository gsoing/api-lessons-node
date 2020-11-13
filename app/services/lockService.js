const config = require('config');
const redis = require('redis');
const Redlock = require('redlock');
const { LockEntityError } = require('../errors/errors')
const redisClient = redis.createClient(config.get('app.lock.redis'));
const ttl = config.get('app.lock.ttl');

redisClient.on('ready', () => {
    console.log('redis client ready');
});

redisClient.on('connect', () => {
    console.log('redis client connected');
});

redisClient.on('error', (err) => {
    console.error('error on redis client', err);
});

var redlock = new Redlock(
	// you should have one client for each independent redis node
	// or cluster
	[redisClient],
	{
		// the expected clock drift; for more details
		// see http://redis.io/topics/distlock
		driftFactor: 0.01, // multiplied by lock ttl to determine drift time
		// the max number of times Redlock will attempt
		// to lock a resource before erroring
		retryCount:  1,
		// the time in ms between attempts
		retryDelay:  20, // time in ms
		// the max time in ms randomly added to retries
		// to improve performance under high contention
		// see https://www.awsarchitectureblog.com/2015/03/backoff.html
		retryJitter:  200 // time in ms
	}
);

// lock an entity and return the lock object
const lock = async (entityId) => {
    try {
        return await redlock.lock(entityId, ttl);
    } catch (err) {
        throw new LockEntityError(entityId);
    }
}

exports.lock = lock;