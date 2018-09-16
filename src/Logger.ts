//  Copyright 2018, Venkat Peri.
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to permit
//  persons to whom the Software is furnished to do so, subject to the
//  following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
//  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
//  USE OR OTHER DEALINGS IN THE SOFTWARE.

import {Level, levels} from "./levels";
import {Formatter} from "./Formatter";
import {StringFormatter} from "./StringFormatter";


export abstract class Logger {
    readonly tag: string
    readonly formatter: Formatter

    get minLevel(): number {
        return levels[process.env.LOG_LEVEL || 'error'].level
    }

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    /**
     * Returns a new logger.
     *
     * @param tag {String} Used to identify the source of a log message.
     * @param formatter
     */
    constructor(tag: string, formatter?: Formatter) {
        this.tag = tag
        this.formatter = formatter || new StringFormatter(tag)
    }

    /**
     * Actually logs the item
     *
     * @param level {String} Log verbosity/priority level
     * @param msg {String} the log message
     * @param args Items inserted after message
     */
    log(level: Level, msg: string, ...args: Array<any>) {
        this.emitLogItem(this.formatter.format(level, this.tag, msg, ...args))
    }

    /**
     * Emits the log item using the given formatter
     * @param item
     */
    abstract emitLogItem(item)

    /**
     * Filters by log level
     *
     * @param level
     * @param msg
     * @param args
     */
    protected doLog(level: Level, msg: string, ...args) {
        if (levels[level].level >= this.minLevel)
            this.log(level, msg, args)
    }

    /**
     * Logs with 'debug' level
     * @param msg the message
     * @param args optional args
     */
    debug(msg, ...args) {
        this.doLog('debug', msg, ...args)
    }

    /**
     * Logs with 'debug' level. Same as {@link Logger.debug}
     * @param msg the message
     * @param args optional args
     */
    d(msg, ...args) {
        this.doLog('debug', msg, ...args)
    }

    /**
     * Logs with 'verbose' level.
     * @param msg the message
     * @param args optional args
     */
    verbose(msg, ...args) {
        this.doLog('verbose', msg, ...args)
    }

    /**
     * Logs with 'verbose' level. Same as {@link Logger.verbose}
     * @param msg the message
     * @param args optional args
     */
    v(msg, ...args) {
        this.doLog('verbose', msg, ...args)
    }

    /**
     * Logs with info {@link Level}
     * @param msg the message
     * @param args optional args
     */
    info(msg, ...args) {
        this.doLog('info', msg, ...args)
    }

    /**
     * Logs with 'info' level.
     * @param msg the message
     * @param args optional args
     */
    i(msg, ...args) {
        this.doLog('info', msg, ...args)
    }

    /**
     * Logs with 'warn' level.
     * @param msg the message
     * @param args optional args
     */
    warn(msg, ...args) {
        this.doLog('warn', msg, ...args)
    }

    /**
     * Logs with 'warn' level.
     * @param msg the message
     * @param args optional args
     */
    w(msg, ...args) {
        this.doLog('warn', msg, ...args)
    }

    /**
     * Logs with 'error' level.
     * @param msg the message
     * @param args optional args
     */
    error(msg, ...args) {
        this.doLog('error', msg, ...args)
    }

    /**
     * Logs with 'error' level.
     * @param msg the message
     * @param args optional args
     */
    e(msg, ...args) {
        this.doLog('error', msg, ...args)
    }
}
