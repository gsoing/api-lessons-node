const { NotFoundError } = require('../errors/errors');
const Tweets = require('../models/tweet');
const lockService = require('./lockService');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const createTweet = async (tweet) => {
    return await Tweets.create({
        text: tweet.text,
        user: tweet.user,
        source: tweet.source
    });
}

const findAll = async (limit, skip) => {
    const promises = [];
    promises.push(Tweets.countDocuments());
    promises.push(Tweets.find({}, null, {limit: limit, skip: skip}).exec());
    const results = await Promise.all(promises);
    return { totalDocuments:results[0], data: results[1] };
}

const getTweet = async (id) => {
    const tweetModel =  await Tweets.findById(id).exec();
    if(!tweetModel) {
        throw new NotFoundError('Tweet', id);
    } 
    return tweetModel;
}

const updateTweet = async (id, tweet) => {
    let lockObject;
    try {
        lockObject = await lockService.lock(id);

        // simulate a long update
        await setTimeoutPromise(10000);

        const tweetModel = await getTweet(id);
        tweetModel.text = tweet.text;
        return tweetModel.save();
    } finally {
        if (lockObject) {
            lockObject.unlock();
        }
    }
}

exports.createTweet = createTweet;
exports.findAll = findAll;
exports.getTweet = getTweet;
exports.updateTweet = updateTweet;
