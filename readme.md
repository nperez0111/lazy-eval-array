# lazy-eval-array [![Build Status](https://travis-ci.org/nperez0111/lazy-eval-array.svg?branch=master)](https://travis-ci.org/nperez0111/lazy-eval-array)

> Lazily Evaluates Arrays via a function that is called on-read of an array's value 


## Install

```
$ npm install --save lazy-eval-array
```


## Usage

```js
const lazy = require('lazy-eval-array');

const arr = lazy( [ 0, 1, 2, 3, () => 4 ] )
arr[3]// => 4

const arr = lazy( [ 0, 1, 2, 3, function() {return this.x} ], { x: 20 } )
arr[3]// => 20 

const arr = lazy( [ (index)=>index, 1, 2, 3, (index,input1,input2)=>input1+input2 ], null, 10, 3 )
arr[0]// => 0
arr[3]// => 13
```


## API

### lazyEvalArray(input, ctx,[ arg1,arg2,argN... ])

#### input

Type: `Array`

The array that is being lazily evaluted.

#### ctx

Type: `Object`

This is the context in which the function will be run in. A.K.A what this will be when the function is run.

##### ags(1-N)

Type: `Anything`

These are the parameters that the inner function is called with. The first parameter that is called if the current index. Meaning the function signature is:
`function (current Index, args1, args2, argsN)`


## License

MIT © [Nick The Sick](http://nickthesick.com)
