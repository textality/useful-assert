var test = require('tape');
var assert = require('../index');

var str = assert.str;
var obj = assert.obj;
var arr = assert.arr;
var map = assert.map;
var set = assert.set;
var num = assert.num;
var int = assert.int;
var undef = assert.undef;
var isparent = assert.isparent;
var any = assert.any;

test('Test assert.str', function(t) {
    t.plan(9);
    t.throws(str, /^AssertionError: undefined is string/, 'throws ..undefined is string');
    t.throws(str.bind(null, 1), /^AssertionError: 1 is string/, 'throws ..1 is string');
    t.equal(str(''), undefined, 'empty string is string');
    t.equal(str('asd'), undefined, '\'asd\' is string');
    t.throws(str.nonempty.bind(str, 1),
            /^AssertionError: 1 is non-empty string/, 'throws ..1 is non-empty string');
    t.throws(str.nonempty.bind(str, ''),
            /^AssertionError: \'\' is non-empty string/, 'throws ..\'\' is non-empty string');
    t.equal(str.nonempty('asd'), undefined, '\'asd\' is non-empty string');
    t.throws(str.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(str.none.bind(str, '', 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.obj', function(t) {
    t.plan(9);
    t.throws(obj, /^AssertionError: undefined is object/, 'throws ..undefined is object');
    t.throws(obj.bind(null, 1), /^AssertionError: 1 is object/, 'throws ..1 is object');
    t.equal(obj({}), undefined, 'empty object is object');
    t.equal(obj({asd: 'bsd'}), undefined, '{asd: \'bsd\'} is object');
    t.throws(obj.nonempty.bind(obj, 1),
            /^AssertionError: 1 is non-empty object/, 'throws ..1 is non-empty object');
    t.throws(obj.nonempty.bind(obj, {}),
            /^AssertionError: \[object Object\] is non-empty object/, 'throws ..[object Object] is non-empty object');
    t.equal(obj.nonempty({asd: 'bsd'}), undefined, '{asd: \'bsd\'} is non-empty object');
    t.throws(obj.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(obj.none.bind(obj, {}, 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.arr', function(t) {
    t.plan(9);
    t.throws(arr, /^AssertionError: undefined is array/, 'throws ..undefined is array');
    t.throws(arr.bind(null, 1), /^AssertionError: 1 is array/, 'throws ..1 is array');
    t.equal(arr([]), undefined, 'empty array is array');
    t.equal(arr([1,2,3]), undefined, '[1,2,3] is array');
    t.throws(arr.nonempty.bind(arr, 1),
            /^AssertionError: 1 is non-empty array/, 'throws ..1 is non-empty array');
    t.throws(arr.nonempty.bind(arr, []),
            /^AssertionError:  is non-empty array/, 'throws .. is non-empty array');
    t.equal(arr.nonempty([1,2,3]), undefined, '[1,2,3] is non-empty array');
    t.throws(arr.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(arr.none.bind(arr, [], 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.map', function(t) {
    t.plan(9);
    t.throws(map, /^AssertionError: undefined is map/, 'throws ..undefined is map');
    t.throws(map.bind(null, 1), /^AssertionError: 1 is map/, 'throws ..1 is map');
    t.equal(map(new Map()), undefined, 'empty map is map');
    t.equal(map(new Map([['key', 'val']])), undefined, 'Map { \"key" => "val" } is map');
    t.throws(map.nonempty.bind(map, 1),
            /^AssertionError: 1 is non-empty map/, 'throws ..1 is non-empty map');
    t.throws(map.nonempty.bind(map, new Map()),
            /^AssertionError: \[object Map\] is non-empty map/, 'throws .. [object Map] is non-empty map');
    t.equal(map.nonempty(new Map([['key', 'val']])), undefined, 'Map { "key" => "val" } is non-empty map');
    t.throws(map.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(map.none.bind(map, new Map(), 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.set', function(t) {
    t.plan(9);
    t.throws(set, /^AssertionError: undefined is set/, 'throws ..undefined is set');
    t.throws(set.bind(null, 1), /^AssertionError: 1 is set/, 'throws ..1 is set');
    t.equal(set(new Set()), undefined, 'empty set is set');
    t.equal(set(new Set([1,2,3])), undefined, 'Set { 1, 2, 3 } is set');
    t.throws(set.nonempty.bind(set, 1),
            /^AssertionError: 1 is non-empty set/, 'throws ..1 is non-empty set');
    t.throws(set.nonempty.bind(set, new Set()),
            /^AssertionError: \[object Set\] is non-empty set/, 'throws .. [object Set] is non-empty set');
    t.equal(set.nonempty(new Set([1, 2, 3])), undefined, 'Set { 1, 2, 3 } is non-empty set');
    t.throws(set.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(set.none.bind(set, new Set(), 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.num', function(t) {
    t.plan(11);
    t.throws(num, /^AssertionError: undefined is number/, 'throws ..undefined is number');
    t.throws(num.bind(null, 'asd'), /^AssertionError: \'asd\' is number/, 'throws ..\'asd\' is number');
    t.throws(num.bind(null, NaN), /^AssertionError: NaN is number/, 'throws ..NaN is number');
    t.throws(num.bind(null, Infinity), /^AssertionError: Infinity is number/, 'throws ..Infinity is number');
    t.throws(num.bind(null, -Infinity), /^AssertionError: -Infinity is number/, 'throws ..-Infinity is number');
    t.throws(num.bind(null, '1'), /^AssertionError: \'1\' is number/, 'throws ..\'1\' is number');
    t.equal(num(1), undefined, '1 is number');
    t.equal(num(-1), undefined, '-1 is number');
    t.equal(num(1.2), undefined, '1.2 is number');
    t.equal(num(0), undefined, '0 is number');
    t.throws(num.bind(null, '', 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.int', function(t) {
    t.plan(11);
    t.throws(int, /^AssertionError: undefined is integer/, 'throws ..undefined is integer');
    t.throws(int.bind(null, 'asd'), /^AssertionError: \'asd\' is integer/, 'throws ..\'asd\' is integer');
    t.throws(int.bind(null, NaN), /^AssertionError: NaN is integer/, 'throws ..NaN is integer');
    t.throws(int.bind(null, Infinity), /^AssertionError: Infinity is integer/, 'throws ..Infinity is integer');
    t.throws(int.bind(null, -Infinity), /^AssertionError: -Infinity is integer/, 'throws ..-Infinity is integer');
    t.throws(int.bind(null, 1.2), /^AssertionError: 1.2 is integer/, 'throws ..1.2 is int');
    t.throws(int.bind(null, '1'), /^AssertionError: \'1\' is integer/, 'throws ..\'1\' is int');
    t.equal(int(1), undefined, '1 is integer');
    t.equal(int(-1), undefined, '-1 is integer');
    t.equal(int(0), undefined, '0 is integer');
    t.throws(int.bind(null, 0.3, 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.undef', function(t) {
    t.plan(3);
    t.throws(undef, /^Error: missing required argument \'v\'/, 'throws error when arguments is not received');
    t.equal(undef(undefined), undefined, 'undefined is undefined');
    t.throws(undef.bind(null, 'asd', 'Custom message'), /^AssertionError: Custom message/, 'test custom message for undef');
});

test('Test assert.true', function(t) {
    t.plan(20);
    t.throws(assert.true, /^AssertionError: undefined is true/, 'throws ..undefined is true');
    t.throws(assert.true.bind(null, false), /^AssertionError: false is true/, 'throws ..false is true');
    t.throws(assert.true.bind(null, null), /^AssertionError: null is true/, 'throws ..null is true');
    t.throws(assert.true.bind(null, 0), /^AssertionError: 0 is true/, 'throws ..0 is true');
    t.throws(assert.true.bind(null, NaN), /^AssertionError: NaN is true/, 'throws ..NaN is true');
    t.throws(assert.true.bind(null, ''), /^AssertionError:  is true/, 'throws ..  is true, for empty string');
    t.throws(assert.true.bind(null, []), /^AssertionError:  is true/, 'throws ..  is true, for empty array');
    t.throws(assert.true.bind(null, {}), /^AssertionError: \[object Object\] is true/, 'throws ..{} is true');
    t.throws(assert.true.bind(null, new Map()), /^AssertionError: \[object Map\] is true/, 'throws ..false is true');
    t.throws(assert.true.bind(null, new Set()), /^AssertionError: \[object Set\] is true/, 'throws ..Set{} is true');
    t.equal(assert.true(true), undefined, 'true is true');
    t.equal(assert.true(1), undefined, '1 is true');
    t.equal(assert.true(Infinity), undefined, 'Infinity is true');
    t.equal(assert.true(-Infinity), undefined, '-Infinity is true');
    t.equal(assert.true('asd'), undefined, '\'asd\' is true');
    t.equal(assert.true([1,2,3]), undefined, '[1,2,3] is true');
    t.equal(assert.true({'foo': 'bar'}), undefined, '{"foo": "bar"} is true');
    t.equal(assert.true(new Map([['foo', 'bar']])), undefined, 'Map {"foo": "bar"} is true');
    t.equal(assert.true(new Set([1,2,3])), undefined, 'Set {1,2,3} is true');
    t.throws(assert.true.bind(null, false, 'Custom message'), /^AssertionError: Custom message/, 'test custom message for assert.true');
});

test('Test assert.isparent', function(t) {
    t.plan(10);
    t.throws(isparent, /^Error: Missing required arguments: parent, obj/,
        'throws error if the method was called without required arguments');
    t.throws(isparent.bind(null, {}), /^Error: Missing required argument: obj/,
        'throws error if the method was called without required argument obj');
    t.throws(isparent.bind(null, 'asd', {}), /^Error: parent must be a object or function/,
        'throws error if parent argument is not object or function');
    t.throws(isparent.bind(null, {}, 'asd'), /^Error: obj must be a object or function/,
        'throws error if obj argument is not object or function');
    t.throws(isparent.bind(null, {}, {}), /^AssertionError: \[object Object\] is parent of \[object Object\]/,
        'throws ..{} is parent of {}');
    t.equal(function() {
        function User() {};
        var user = new User();
        return isparent(User, user);
    }(), undefined, 'User is parent of user(instanceof case)');
    t.equal(function() {
        var User = {};
        var user = Object.create(User);
        return isparent(User, user);
    }(), undefined, 'User is parent of user(isPrototypeOf case)');
    t.equal(function() {
        var Human = {};
        function User() {};
        User.prototype.__proto__ = Human;
        var user = new User();
        return isparent(Human, user);
    }(), undefined, 'Human is parent of user(isPrototypeOf inderect case)');
    t.equal(function() {
        var User = Object.create(null);
        var user = {};
        user.__proto__ = User;
        return isparent(User, user);
    }(), undefined, 'User is parent of user(isPrototypeOf inderect case, when User is not inherit of Object)');
    t.throws(isparent.bind(null, {}, {}, 'Custom message'), /^AssertionError: Custom message/, 'test custom message for assert.isparent');
});

test('Test assert.any', function(t) {
    t.plan(19);
    t.throws(any, /^Error: Missing required argument: assert method/,
            'throws error if the method was called without required arguments');
    t.throws(any.bind(null, 'asd'), /^Error: First argument must be a one of assert methods/,
            'throws error if the first argument is not function');
    t.throws(any.bind(null, Function.bind(null, 'asd')), /^Error: First argument must be a one of assert methods/,
            'throws error if the first argument is not a one of assert methods(bound method)');
    t.throws(any.bind(null, Function, 'asd'), /^Error: First argument must be a one of assert methods/,
            'throws error if the first argument is not a one of assert methods(non-bound method)');
    t.throws(any.bind(null, assert.ok), /^Error: Arguments must be present, when is non-bound methods are used/,
           'throws error if missing arguments and non-bound methods are used.'); 
    t.throws(any.bind(null, assert.ok.bind(null, true), str),
            /^Error: Arguments must be present, when is non-bound methods are used/,
           'throws error if missing arguments and non-bound methods are used(bound + non-bound).'); 
    t.throws(any.bind(null, str, assert.ok, false),
            /^AssertionError: false is string; false == true/, ('throws AssertionError: ' +
                'false is string; false == true(non-bound methods)'));
    t.equal(any(str, assert.ok, true), undefined, ('test non-bound assert methods, when one of ' +
                'these is successful'));
    t.equal(any(str, assert.ok, 'asd'), undefined, ('test non-bound assert methods, when all of ' +
                'these is successful'));
    t.throws(any.bind(null, str.bind(null, 2), assert.ok.bind(null, false)),
            /^AssertionError: 2 is string; false == true/, ('throws AssertionError: ', +
                '2 is string; false == true(bound methods)'));
    t.equal(any(str.bind(null, 'asd'), assert.ok.bind(null, false)), undefined, ('test bound assert methods, ' +
                'when one of these is successful'));
    t.equal(any(str.bind(null, 'asd'), assert.ok.bind(null, true)), undefined, ('test bound assert methods, ' +
                'when all of these is successful'));
    t.throws(any.bind(null, str, assert.ok.bind(null, false), 2), /^AssertionError: 2 is string; false == true/,
            'throws AssertionError: 2 is string; false == true (bound + non-bound methods)');
    t.equal(any(str, assert.ok.bind(null, false), 'asd'), undefined, ('test bound + non-bound assert methods, ' +
                'when one of these is successful'));
    t.equal(any(str.bind(null, 'asd'), assert.ok, true), undefined, ('test bound + non-bound assert methods, ' +
                'when all of these is successful'));
    t.throws(any.bind(null, str, assert.ok.bind(null, false), 2, new assert.CustomMessage('Custom message')),
            /^AssertionError: Custom message/,
            'test custom message');
    t.throws(any.bind(null, str.bind(null, 2, 'Custom message'), assert.ok, false),
            /^AssertionError: Custom message; false == true/, 'test methods-level custom message');
    t.throws(any.bind(null, str.none.bind(null, '', 'Custom message'), num, ''),
            /^AssertionError: Custom message; \'\' is number/,
            'test assert.<method>.none whith methods-level custom message');
    t.equal(any(str.none, undef, num, 'asd'), undefined, 'test assert.<method>.none whith assert.any');
});

test('Test assert.isAssertMethod', function(t) {
    t.plan(5);
    t.equal(assert.isAssertMethod(assert.ok), true, 'Test isAssertMethod with native assert method');
    t.equal(assert.isAssertMethod(assert.str), true, 'Test isAssertMethod with assert method');
    t.equal(assert.isAssertMethod(assert.CustomMessage), undefined,
            'Test isAssertMethod with method from assert module, that not is assertion');
    t.equal(assert.isAssertMethod(function() {}), undefined,
            'Test isAssertionMethod with function, that not is assert method');
    t.throws(assert.isAssertMethod.bind(null, 'asd'),
            /^Error: fn must be a function!/, 'test isAssertionMethod with non-function argument');
});
