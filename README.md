# useful-assert
Extends the native Node asserts by useful methods.

### install
*npm install useful-assert*

### update
*npm update useful-assert*

### uninstall
*npm uninstall useful-assert*

### methods
Note: native methods also available  
* *assert.string*
* *assert.string.nonempty*
* *assert.object*
* *assert.object.nonempty*
* *assert.array*
* *assert.array.nonempty*
* *assert.map*
* *assert.map.nonempty*
* *assert.set*
* *assert.set.nonempty*
* *assert.number*
* *assert.integer*
* *assert.undefined*
* *assert.true*
* *assert.isParent*

### shortcuts
* *assert.str*
* *assert.str.none*
* *assert.obj*
* *assert.obj.none*
* *assert.arr*
* *assert.arr.none*
* *assert.map*
* *assert.map.none*
* *assert.set*
* *assert.set.none*
* *assert.num*
* *assert.int*
* *assert.undef*
* *assert.true*
* *assert.isparent*

### example
```javascript
var assert = require('useful-assert');

// Native methods..
assert.ok(true); // Native method "ok"

// assert.string
assert.str(5); // Throws AssertionError: 5 is non-empty string
assert.str('');
assert.str.nonempty(''); // Throws AssertionError: "" is non-empty string
assert.str.none(''); // Throws AssertionError: "" is non-empty string
assert.str.none('foo');

// assert.object
assert.obj([1,2,3]); // Throws AssertionError: 1,2,3 is object
assert.obj({});
assert.obj.nonempty({}); // Throws AssertionError: [object Object] is non-empty object
assert.obj.none({}); // Throws AssertionError: [object Object] is non-empty object
assert.obj.none({'foo': 'bar'});

// assert.number
assert.num(true); // Throws AssertionError: true is number
assert.num(0);
assert.num(-1);
assert.num(NaN); // Throws AssertionError: NaN is number
assert.num(Infinity); // Throws AssertionError: Infinity is number
assert.num(-Infinity); // Throws AssertionError: -Infinity is number
assert.num(1.2);

// assert.integer
assert.int(0.8); // Throws AssertionError: 0.8 is integer
assert.int(5);
assert.int(0);

// assert.true
assert.true(false); // Throws AssertionError: false is true
assert.true(''); // Throws AssertionError:   is true
assert.true(NaN); // Throws AssertionError: NaN is true
assert.true(0); // Throws AssertionError: 0 is true
assert.true([]); // Throws AssertionError:   is true
assert.true({}); // Throws AssertionError: [object Object] is true
assert.true(true);
assert.true('foo');

// asserts.isParent
asserts.isparent({}, {}); // Throws AssertionError: [object Object] is parent of [object Object]
function Foo(){};
var foo = new Foo();
assert.isparent(Foo, foo);
var Bar = {};
Foo.prototype.__proto__ = Bar;
foo = new Foo();
assert.isparent(Bar, foo);
Foo = {};
foo = Object.create(Foo);
assert.isparent(Foo, foo);

// custom assertion error message
assert.true(false, 'Custom message'); // Throws AssertionError: Custom message
assert.isparent({}, {}, 'Custom message'); // Throws AssertionError: Custom message
```

### license
MIT
