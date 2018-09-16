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

import 'mocha'
import {Level, levels, StreamLogger} from '..'
import {expect} from 'chai';
import sb = require('stream-buffers');

let Log
let tag = 'TAG'
let stream

class Stream {
    stream = new sb.WritableStreamBuffer()

    toString(): string {
        return this.stream.getContentsAsString('utf8')
    }
}

function setLevel(level: Level) {
    process.env.LOG_LEVEL = level
}

describe('wtlog', () => {

    before(() => {
        stream = new Stream()
        Log = new StreamLogger(tag, stream.stream)
    })

    Object.keys(levels).forEach(l => {
        it(`logs at '${l}' level`, () => {
            setLevel(<Level>l)
            Log[l]('test')
            expect(stream.toString()[0]).to.eq(l[0].toUpperCase())
        })
    })
})
