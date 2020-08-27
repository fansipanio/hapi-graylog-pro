/* eslint-disable no-console */

const { parse, stringify } = require('flatted');
const logger = require('gelf-pro');
const pkg = require('./package');

const DEFAULT_LOG_LEVEL = 6; // info

const getLogLevel = (tag) => (Object.prototype.hasOwnProperty.call(logger.config.levels, tag) ? logger.config.levels[tag] : DEFAULT_LOG_LEVEL);

const sendMessage = (tag, data, extra) => {
    try {
        const isString = typeof data === 'string' || data instanceof String;
        const message = isString ? data : stringify(data);
        const level = getLogLevel(tag);
        const extraData = extra ? parse(stringify(extra)) : undefined;

        logger.message(message, level, extraData);
    } catch (e) {
        console.error(e);
    }
};

const register = (server, options) => {
    logger.setConfig(options);

    server.events.on('log', (event) => {
        sendMessage(event.tags[0], event.data);
    });

    server.events.on('request', (request, event) => {
        // @TODO: add request data into logs
        sendMessage(event.tags[0], event.data);
    });
};

exports.plugin = {
    pkg,
    register
};
