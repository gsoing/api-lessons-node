const { NotFoundError } = require('../errors/errors');
const Tweets = require('../models/tweet');

const createTweet = async (tweet) => {
    return await Tweets.create({
        text: tweet.text,
        username: tweet.username,
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
    const tweetModel = await getTweet(id);
    tweetModel.text = tweet.text;
    return tweetModel.save();
}

exports.createTweet = createTweet;
exports.findAll = findAll;
exports.getTweet = getTweet;
exports.updateTweet = updateTweet;
