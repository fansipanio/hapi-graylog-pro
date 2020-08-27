'use strict'

const {parse, stringify} = require('flatted');
const logger = require('gelf-pro');
const pkg = require('./package');

const defaultLevel = 6;
const levels = {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
};

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

const getLogLevel = (tag) => levels.hasOwnProperty(tag) ? levels[tag] : defaultLevel;

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