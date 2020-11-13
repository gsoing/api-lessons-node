const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const tweetService = require('../services/tweetService');
const errorManager = require('../errors/errorUtils');
const { BasicHttpError, AbstractHttpError } = require('../errors/errors');

const manageValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return {
            returnCode: 400,
            body: errorManager.transformErrors(errors.array())
        } ;
    } 
    return undefined;
}

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
    if(err) {
        console.error('error handler', err);
        if (err instanceof BasicHttpError) {
            res.status(err.httpStatus).json(err.body);
        } else if (err instanceof AbstractHttpError ) {
            res.status(err.httpStatus).json( [ { errorCode: err.errorCode, errorMessage: err.errorMessage } ] );
        } else {
            res.status(500).json([{errorCode: 'err.tech.unexpected', errorMessage: err.message }])
        }
    }
}

router.route('/tweets')
    .post([body('text').isString(), body('user.nickname').isString(), body('user.mail').isEmail()], async (req, res, next) => {
        const error = manageValidation(req);
        if (error) {
            next(new BasicHttpError(error.returnCode, error.body));
        } else {
            const createdTweet = await tweetService.createTweet(req.body);
            res.status(201).location(`./${createdTweet._id}`).json(createdTweet.toObject())
        }
    })
    .get(async (req, res, next) => {
        const error = manageValidation(req);
        if (error) {
            next(new BasicHttpError(error.returnCode, error.body));
        } else {
            const limit = parseInt(req.query.size, 10) || 10;
            const offset = parseInt(req.query.offset, 10) || 0;
            const allTweets = await tweetService.findAll(limit, offset);
            const pageData = {
                totalResults: allTweets.totalDocuments,
                offset: offset,
                data: allTweets.data.map((tweet) => tweet.toObject())
            };
            res.status(200).json(pageData);
        }
    });
router.route('/tweets/:id')
    .all([param('id').isAlphanumeric().isLength({min: 15, max: 50})], (req, res, next) => {
        const error = manageValidation(req);
        if (error) {
            next(new BasicHttpError(error.returnCode, error.body));
        } else {
            next();
        }
    })
    .get(async (req, res, next) => {
        try {
            const tweet = await tweetService.getTweet(req.params.id);
            res.status(200).json(tweet.toObject());
        } catch (err) {
            next(err);
        }

    })
    .put([body('text').isString()], async (req, res, next) => {
        try {
            const updatedTweet = await tweetService.updateTweet(req.params.id, req.body);
            res.status(200).json(updatedTweet.toObject());
        } catch (err) {
            next(err);
        }
 
    });

router.use(handleError);

module.exports = router;
