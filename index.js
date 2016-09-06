var assert = require('assert');
var bool = require('true-bool');

module.exports = assert;

var log = console.log.bind(console);

assert.str = string;
assert.string = string;
assert.obj = object;
assert.object = object;
assert.arr = array;
assert.array = array;
assert.map = map;
assert.set = set;
assert.num = number;
assert.number = number;
assert.int = integer;
assert.integer = integer;
assert.undefined = undefined_;
assert.undef = undefined_;
assert.true = true_;
assert.isParent = isParent;
assert.isparent = isParent;
assert.any = any;
assert.CustomMessage = CustomMessage;
assert.isAssertMethod = isAssertMethod;

// sign, to mark assert methods
var _SIGN = Math.random().toString() + Date.now().toString();

string.none = string.nonempty = _nonempty(string);
object.none = object.nonempty = _nonempty(object);
array.none = array.nonempty = _nonempty(array);
map.none = map.nonempty = _nonempty(map);
set.none = set.nonempty = _nonempty(set);

_markAssertMethods();

function _withoutConstructor(v) {
    if (v === undefined || v === null) return true;
}

function _nonempty(fn) {
    var noneFn = function(v, msg) {
        return fn(v, msg, true);
    };
    noneFn.bind = _customBind;
    noneFn[_SIGN] = true;
    return noneFn;
}

function _getProto(obj) {
    if (Object.getPrototypeOf && typeof Object.getPrototypeOf == 'function') {
        return Object.getPrototypeOf(obj);
    } else {
        return obj.__proto__;
    }
}

function _customBind() {
    var boundFn = _getProto(this).bind.apply(this, arguments);
    boundFn[_SIGN] = true;
    return boundFn;
}

function _markAssertMethods() {
    for (var k in assert) {
        if (k == 'AssertionError' || k == 'CustomMessage') continue;
        var fn = assert[k];
        fn[_SIGN] = true;
        fn.bind = _customBind;
    }
}

function _isBound(fn) {
    if (typeof fn != 'function') throw new Error('argument must be a function');
    return !('prototype' in fn);
}

function isAssertMethod(fn) {
    if (typeof fn != 'function') throw new Error('fn must be a function!');
    if (fn[_SIGN]) return true;
}

function string(v, msg, nonempty) {
    if (typeof v != 'string') {
        var fail = true;
        if (!msg) msg = nonempty ? v + ' is non-empty string' : v + ' is string';
    } else if (nonempty && !v) {
        fail = true;
        msg = msg ? msg : '\'\' is non-empty string';
    }
    if (fail) throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function object(v, msg, nonempty) {
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

function array(v, msg, nonempty) {
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

function number(v, msg) {
    if (typeof v != 'number' ||
            v.toString() == 'NaN' ||
            v.toString() == 'Infinity' ||
            v.toString() == '-Infinity') {
        if (typeof v == 'string') v = '\'' + v + '\'';
        msg = msg ? msg : v + ' is number';
        throw new assert.AssertionError(
                {message: msg, stackStartFunction: arguments.callee});
    }
}

function integer(v, msg) {
    if (typeof v != 'number' ||
            v.toString() == 'NaN' ||
            v.toString() == 'Infinity' ||
            v.toString() == '-Infinity' ||
            v % 1 != 0) {
        if (typeof v == 'string') v = '\'' + v + '\'';
        msg = msg ? msg : v + ' is integer';
        throw new assert.AssertionError(
                {message: msg, stackStartFunction: arguments.callee});
    }
}

function undefined_(v, msg) {
    if (arguments.length == 0) throw new Error(
        'missing required argument \'v\'!');
    if (v !== undefined) {
      msg = msg ? msg : v + ' is undefined';
      throw new assert.AssertionError(
          {message: msg, stackStartFunction: arguments.callee});
    }
}

function true_(v, msg) {
    if (bool(v)) return;
    msg = msg ? msg : v + ' is true';
    throw new assert.AssertionError(
        {message: msg, stackStartFunction: arguments.callee}); 
}

function isParent(parent, obj, msg) {
    /**
     * Asserts that <parent> is parent of <obj>. That's
     * <obj> instanceof <parent>, or <parent>.isPrototypeOf(<obj>)
     *
     * @param {Object} parent
     * @param {Object} obj
     * @param {string} [msg]
     *
     * @throws {Error} Missing required arguments: parent, obj
     * @throws {Error} Missing required argument: obj
     * @throws {Error} parent must be a object or function
     * @throws {Error} obj must be a object or function
     * @throws {AssertionError} [object Object] is parent of [object Object]
     */
    if (arguments.length == 0) {
        throw new Error('Missing required arguments: parent, obj');
    } else if (arguments.length == 1) {
        throw new Error('Missing required argument: obj');
    } else if (parent === null ||
               (typeof parent != 'object' && typeof parent != 'function')) {
        throw new Error('parent must be a object or function');
    } else if (obj === null ||
               (typeof obj != 'object' && typeof obj != 'function')) {
        throw new Error('obj must be a object or function');
    }
    msg = msg ?
          msg :
          (Object.prototype.toString.call(parent) + ' is parent of ' +
           Object.prototype.toString.call(obj));
    if (typeof parent == 'function') {
        if (obj instanceof parent) return;
    } else {
        if (Object.prototype.isPrototypeOf.call(parent, obj)) return;
    }
    throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}

function CustomMessage(msg) {
    if (!(this instanceof CustomMessage)) throw new Error(
            'CustomMessage needs to be called with the new keyword');
    if (!(msg && typeof msg == 'string')) throw new Error(
            'msg must be a non-empty string!');
    this.value = msg;
}

function any(assertMethod, arg, customMessage) {
    /**
     * Unites several assertions. If at least one of these are successful,
     * doesn't throws any AssertionError. Otherwise, throws AssertionError.
     *
     * @param {...function} assertMethod - An assert method (e.g., assert.ok)
     * @param {...*} [arg] - An argument that will be passed to assert methods
     * @param {string} [customMessage] - A custom message that will be replace
     *     default message of assertion error
     *
     * @throws {Error} Missing required argument: assert method
     * @throws {Error} First argument must be a one of assert methods
     * @throws {Error} Arguments must be present, when is non-bound methods are used
     * @throws {AssertionError}
     */
    if (arguments.length == 0) throw new Error(
            'Missing required argument: assert method');
    if (typeof arguments[0] != 'function' ||
        !isAssertMethod(arguments[0])) throw new Error(
            'First argument must be a one of assert methods');
    var assertions = [];
    var args = [];
    var messages = [];
    var unbound = false;
    var msg;
    for (var i=0; i < arguments.length; i++) {
        var a = arguments[i];
        if (typeof a == 'function' && isAssertMethod(a)) {
            assertions.push(a);
            if (!(unbound || _isBound(a))) unbound = true;
        } else if(a instanceof CustomMessage) {
            msg = a.value;
        } else {
            args.push(a);
        }
    }
    if (unbound && args.length == 0) throw new Error(
            'Arguments must be present, when is non-bound methods are used');
    for (var i=0; i < assertions.length; i++) {
        var fn = assertions[i];
        try {
            if (_isBound(fn)) {
                fn();
             } else {
                 fn.apply(null, args);
             }
            return;
        } catch(err) {
            if (!(err instanceof assert.AssertionError)) throw err;
            if (msg) continue;
            messages.push(err.message);
        }
    }
    msg = msg ? msg : messages.join('; ');
    throw new assert.AssertionError(
            {message: msg, stackStartFunction: arguments.callee});
}
