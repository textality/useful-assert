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

test('Test assert.str', function(t) {
    t.plan(9);
    t.throws(str, /^AssertionError: undefined is string/, 'throws ..undefined is string');
    t.throws(str.bind(null, 1), /^AssertionError: 1 is string/, 'throws ..1 is string');
    t.equal(str(''), undefined, 'empty string is string');
    t.equal(str('asd'), undefined, '"asd" is string');
    t.throws(str.nonempty.bind(str, 1),
            /^AssertionError: 1 is non-empty string/, 'throws ..1 is non-empty string');
    t.throws(str.nonempty.bind(str, ''),
            /^AssertionError: "" is non-empty string/, 'throws .."" is non-empty string');
    t.equal(str.nonempty('asd'), undefined, '"asd" is non-empty string');
    t.throws(str.bind(null, 3, 'Custom message'), /^AssertionError: Custom message/);
    t.throws(str.none.bind(str, '', 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.obj', function(t) {
    t.plan(9);
    t.throws(obj, /^AssertionError: undefined is object/, 'throws ..undefined is object');
    t.throws(obj.bind(null, 1), /^AssertionError: 1 is object/, 'throws ..1 is object');
    t.equal(obj({}), undefined, 'empty object is object');
    t.equal(obj({asd: 'bsd'}), undefined, '{asd: "bsd"} is object');
    t.throws(obj.nonempty.bind(obj, 1),
            /^AssertionError: 1 is non-empty object/, 'throws ..1 is non-empty object');
    t.throws(obj.nonempty.bind(obj, {}),
            /^AssertionError: \[object Object\] is non-empty object/, 'throws ..[object Object] is non-empty object');
    t.equal(obj.nonempty({asd: 'bsd'}), undefined, '{asd: "bsd"} is non-empty object');
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
    t.equal(map(new Map([['key', 'val']])), undefined, 'Map { "key" => "val" } is map');
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
    t.throws(num.bind(null, 'asd'), /^AssertionError: "asd" is number/, 'throws .."asd" is number');
    t.throws(num.bind(null, NaN), /^AssertionError: NaN is number/, 'throws ..NaN is number');
    t.throws(num.bind(null, Infinity), /^AssertionError: Infinity is number/, 'throws ..Infinity is number');
    t.throws(num.bind(null, -Infinity), /^AssertionError: -Infinity is number/, 'throws ..-Infinity is number');
    t.throws(num.bind(null, '1'), /^AssertionError: "1" is number/, 'throws .."1" is number');
    t.equal(num(1), undefined, '1 is number');
    t.equal(num(-1), undefined, '-1 is number');
    t.equal(num(1.2), undefined, '1.2 is number');
    t.equal(num(0), undefined, '0 is number');
    t.throws(num.bind(null, '', 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.int', function(t) {
    t.plan(11);
    t.throws(int, /^AssertionError: undefined is integer/, 'throws ..undefined is integer');
    t.throws(int.bind(null, 'asd'), /^AssertionError: "asd" is integer/, 'throws .."asd" is integer');
    t.throws(int.bind(null, NaN), /^AssertionError: NaN is integer/, 'throws ..NaN is integer');
    t.throws(int.bind(null, Infinity), /^AssertionError: Infinity is integer/, 'throws ..Infinity is integer');
    t.throws(int.bind(null, -Infinity), /^AssertionError: -Infinity is integer/, 'throws ..-Infinity is integer');
    t.throws(int.bind(null, 1.2), /^AssertionError: 1.2 is integer/, 'throws ..1.2 is int');
    t.throws(int.bind(null, '1'), /^AssertionError: "1" is integer/, 'throws .."1" is int');
    t.equal(int(1), undefined, '1 is integer');
    t.equal(int(-1), undefined, '-1 is integer');
    t.equal(int(0), undefined, '0 is integer');
    t.throws(int.bind(null, 0.3, 'Custom message'), /^AssertionError: Custom message/);
});

test('Test assert.undef', function(t) {
    t.plan(3);
    t.throws(undef, /^Error: missing required argument "v"/, 'throws error when arguments is not received');
    t.equal(undef(undefined), undefined, 'undefined is undefined');
    t.throws(undef.bind(null, 'asd', 'Custom message'), /^AssertionError: Custom message/, 'test custom message for undef');
});
