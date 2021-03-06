'use strict';

function generateId(counts) {
    return counts
        .map((count) => {
        let out = "";
        for (let i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    })
        .join("-");
}
const guid = () => generateId([2, 1, 1, 1, 3]);

exports.guid = guid;
exports.guid$1 = guid;
