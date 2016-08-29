var assert = require('assert');
log = console.log.bind(console);

module.exports = assert;

assert.str = str;
assert.obj = obj;
assert.arr = arr;
assert.map = map;
assert.set = set;
assert.num = num;
assert.int = int;

str.nonempty = _nonempty;
obj.nonempty = _nonempty;
arr.nonempty = _nonempty;
map.nonempty = _nonempty;
set.nonempty = _nonempty;

function str(v, msg, nonempty) {
    if (typeof v != 'string') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty string' : v + ' is string';
    } else if (nonempty && !v) {
        fail = true;
        msg = msg ? msg : '"" is non-empty string';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function obj(v, msg, nonempty) {
    if (_withoutConstructor(v) || v.constructor.name != 'Object') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty object' : v + ' is object';
    } else if (nonempty) {
        for (var k in v) return; 
        fail = true;
        msg = msg ? msg : v + ' is non-empty object';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function arr(v, msg, nonempty) {
    if (_withoutConstructor(v) || v.constructor.name != 'Array') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty array' : v + ' is array';
    } else if (nonempty) {
        fail = v.length ? false : true;
        msg = msg ? msg : v + ' is non-empty array';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function map(v, msg, nonempty) {
    if (_withoutConstructor(v) || v.constructor.name != 'Map') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty map' : v + ' is map';
    } else if (nonempty) {
        fail = v.size ? false : true;
        msg = msg ? msg : v + ' is non-empty map';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function set(v, msg, nonempty) {
    if (_withoutConstructor(v) || v.constructor.name != 'Set') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty set' : v + ' is set';
    } else if (nonempty) {
        fail = v.size ? false : true;
        msg = msg ? msg : v + ' is non-empty set';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function num(v, msg) {
    if (typeof v != 'number' ||
            v.toString() == 'NaN' ||
            v.toString() == 'Infinity' ||
            v.toString() == '-Infinity') {
        if (typeof v == 'string') v = '"' + v + '"';
        msg = msg ? msg : v + ' is number';
        throw new assert.AssertionError(
                {message: msg, stackStartFunction: arguments.callee});
    }
}

function int(v, msg) {
    if (typeof v != 'number' ||
            v.toString() == 'NaN' ||
            v.toString() == 'Infinity' ||
            v.toString() == '-Infinity' ||
            v % 1 != 0) {
        if (typeof v == 'string') v = '"' + v + '"';
        msg = msg ? msg : v + ' is integer';
        throw new assert.AssertionError(
                {message: msg, stackStartFunction: arguments.callee});
    }
}

function _withoutConstructor(v) {
    if (v === undefined || v === null) return true;
}

function _nonempty(v, msg) {
    this(v, msg, true);
}
