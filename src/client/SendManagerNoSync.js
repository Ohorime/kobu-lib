'use strict';

const erlpack = require('erlpack');

class SendManagerNoSync {
    ws;
    #crtps = 0;
    #lastCrtps = Date.now();
    #crtpm = 0;
    #lastCrtpm = Date.now();
    #crtIdentify = 0;
    #lastCrtIdentify = Date.now();
    #identify;
    #eventQueue;
    #call;
    #queue;
    constructor(ws) {
        /**
         * @type {WebSocket}
         */
        this.ws = ws;
        /**
         * Count Rate Limit Per Seconds
         * @type {number}
         */
        this.#crtps = 0;
        /**
         * @type {number}
         */
        this.#lastCrtps = Date.now();
        /**
         * Count Rate Limit Per Minutes
         * @type {number}
         */
        this.#crtpm = 0;
        /**
         * @type {number}
         */
        this.#lastCrtpm = Date.now();
        /**
         * Count Rate Limit Identify
         * @type {number}
         */
        this.#crtIdentify = 0;
        /**
         * @type {number}
         */
        this.#lastCrtIdentify = Date.now();
        /**
         * @type {any[]}
         */
        this.#identify = null;
        /**
         * @type {any[][]}
         */
        this.#eventQueue = [];
        /**
         * @type {boolean}
         */
        this.#call = false;
        /**
         * @type {any[][]}
         */
        this.#queue = [];
    };

    add(type, data) {
        if (type == 'event') this.#eventQueue.push(data);
        else if (type == 'identify') this.#identify = data;

        this._call();
        return this;
    };

    _call() {
        if (this.#call) return;
        this.#call = true;
        Promise.all([
            new Promise((next) => this.execEvent(next)),
            new Promise((next) => this.execIndetify(next)),
        ]).then(() => this.#call = false);
        return this;
    };

    execEvent(next) {
        if (this.#eventQueue.length < 1) return next();
        if (this.#crtpm >= 120) {
            this.timeout = 60 - (Date.now() - this.#lastCrtpm);
            if (this.timeout < 0) {
                this.timeout = 1;
                this.#crtpm = 0;
            };
        } else this.timeout = 1;

        setTimeout(() => {
            if (this.#crtps >= 2) {
                this.timeout = 2 - (Date.now() - this.#lastCrtps);
                if (this.timeout < 0) {
                    this.timeout = 1;
                    this.#crtps = 0;
                };
            } else this.timeout = 1;

            setTimeout(() => {
                this._send(...this.#eventQueue.pop());
                this.#crtpm++;
                this.#crtps++;
                this.execEvent(next);
            }, this.timeout);
        }, this.timeout);

        return this;
    };

    execIndetify(next) {
        if (this.#crtIdentify >= 1) {
            this.timeout = 5 - (Date.now() - this.#lastCrtIdentify);
            if (this.timeout < 0) {
                this.timeout = 0;
                this.#crtIdentify = 0;
            };
        } else this.timeout = 1;

        setTimeout(() => {
            this._send(...this.#identify);
            this.#crtIdentify++;
            next();
        }, this.timeout);

        return this;
    };

    send(op, data, event, sequence, disableQueue = false) {
        if ((!this.ws || this.ws.readyState != this.ws.OPEN) && !disableQueue) {
            return this.#queue.push([op, data, event, sequence]);
        };

        if (op == 6) this._send(op, data, event, sequence);
        else if (op == 2) this.add('identify', [op, data, event, sequence]);
        else this.add('event', [op, data, event, sequence]);

        return this;
    };

    _send(op, d, t, s) {
        this.ws.send(erlpack.pack({op, d, t, s}));
        return this;
    };

    emptying() {
        for (const action of this.#queue) this.send(...action, true);
        return this;
    };
};

module.exports = SendManagerNoSync;