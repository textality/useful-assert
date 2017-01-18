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
* *assert.function*
* *assert.boolean*
* *assert.ostr* - Optional string (string or undefined)
* *assert.ostrn* - Optional non-empty string
* *assert.oobj* - Optional object (object or undefined)
* *assert.oobjn* - Optional non-empty object
* *assert.oarr* - Optional array (array or undefined)
* *assert.oarrn* - Optional non-empty array
* *assert.omap* - Optional map (map or undefined)
* *assert.omapn* - Optional non-empty map
* *assert.oset* - Optional set (set or undefined)
* *assert.osetn* - Optional non-empty set
* *assert.onum* - Optional number (number or undefined)
* *assert.oint* - Optional int (int or undefined)
* *assert.otrue* - Optional true value (true value or undefined)
* *assert.oisparent* - Optional isparent
* *assert.ofn* - Optional function (function or undefined)
* *assert.obool* - Optional boolean (boolean or undefined)

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
* *assert.fn*
* *assert.bool*

### example
```javascript
var assert = require('useful-assert');

// Native methods..
assert.ok(true); // Native method "ok"

// assert.string
assert.str(5); // Throws AssertionError: 5 is non-empty string
assert.str('');
assert.str.nonempty(''); // Throws AssertionError: '' is non-empty string
assert.str.none(''); // Throws AssertionError: '' is non-empty string
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

// assert.any
assert.any(assert.str, assert.array.nonempty, [1, 2, 3]);
assert.any(assert.str.none, assert.num, assert.ok, ''); // AssertionError: '' is non-empty string; '' is number; '' == true
assert.any(assert.num, assert.array, 'asd', new assert.CustomMessage('Custom message')); // AssertionError: Custom message
assert.any(assert.num, assert.str.none.bind(null, '', 'Custom message'), false); // AssertionError: false is number; Custom message

// custom assertion error message
assert.true(false, 'Custom message'); // Throws AssertionError: Custom message
assert.isparent({}, {}, 'Custom message'); // Throws AssertionError: Custom message

// assert.isAssertMethod
assert.isAssertMethod(assert.ok); // true
assert.isAssertMethod(assert.str); // true
assert.isAssertMethod(assert.str.none); // true
assert.isAssertMethod(assert.CustomMessage) // undefined
assert.isAssertMethod(function foo() {}) // undefined
assert.isAssertMethod('asd') // Throws Error: fn must be a function!

```

### license
MIT
