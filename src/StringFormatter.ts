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

import {prefix, pz2, pz3} from "./utils";
import {Level} from "./levels";
import {Formatter} from "./Formatter";

export class StringFormatter extends Formatter {
    readonly tag: string
    readonly sep: string

    /**
     *
     * @param tag
     * @param prefixLen
     * @param sep
     */
    constructor(tag: string, {prefixLen = 12, sep = ' '} = {}) {
        super()
        this.sep = sep
        this.tag = prefix(tag, prefixLen)
    }

    /**
     * Format level
     * @param level
     */
    formatLevel(level: Level): string {
        return level[0].toUpperCase()
    }

    /**
     * Format time stamp
     * @param t
     * @return {string}
     */
    formatTime(t: Date = new Date()): string {
        return `${pz2(t.getMonth())}-${pz2(t.getDate())} ${pz2(t.getHours())}:${pz2(t.getMinutes())}:${pz2(t.getSeconds())}:${pz3(t.getMilliseconds())}`
    }

    /**
     *
     * @param level
     * @return {string}
     * @param tag
     */
    formatPrefix(level: Level, tag: string): string {
        const l = this.formatLevel(level)
        return `${l}/${this.formatTime()}/${this.tag}`
    }

    /**
     * Formats the entire log item
     * @param level
     * @param msg
     * @param args
     * @return {string}
     * @param tag
     */
    format(level: Level, tag: string, msg: string, ...args): string {
        let a = args.map(x => typeof x === 'object' ? JSON.stringify(x) : x.toString())
        return `${this.formatPrefix(level, tag)} - ${msg} ${a.join(this.sep)}`
    }
}
