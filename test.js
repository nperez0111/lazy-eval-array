import test from 'ava';
import fn from '.';
const log = a => {
    console.log( a );
    return a
}
test( 'is same array if no val is function', t => {
    const a = fn( [ 0, 1, 2 ] )
    const expected = [ 0, 1, 2 ]
    const actual = a.slice( 0 )
    t.deepEqual( actual, expected )
} );
test( 'a function is executed and its value is just a number', t => {
    const x = fn( [ 0, () => 3 ] )
    const e = 3
    const a = x[ 1 ]
    t.is( a, e )
} )
test( 'mapping gives all of its value', t => {
    const x = fn( [ 0, 1, () => 5 ] )
    const e = [ 0, 1, 5 ]
    const a = x.map( a => a )
    t.deepEqual( a, e )
} )
test( 'all values returned as promise', t => {
    const x = fn.promisify( [ 2, 1, () => 5 ] )
    const e = [ 2, 1, 5 ]
    x.forEach( ( a, i ) => {
        a.then( val => {
            t.deepEqual( val, e[ i ] )
        } )
    } )
} )
test( 'is memoized to not run multiple times', t => {
    let i = 0
    const x = fn( [ 0, 1, () => {
        i++;
        return 5
    } ] )
    const e = 1
    x[ 2 ]
    x[ 2 ]
    const a = i
    t.deepEqual( a, e )
} )
test( 'is not memoized to not run multiple times with nomemoization enabled', t => {
    let i = 0
    const x = fn.noMemoization( [ 0, 1, () => {
        i++;
        return 5
    } ] )
    const e = 2
    x[ 2 ]
    x[ 2 ]
    const a = i
    t.deepEqual( a, e )
} )
test( 'can add extra parameters to call with', t => {
    const x = fn( [ 0, 1, ( i, three ) => 5 + three ], null, 3 )
    const e = 8
    const a = x[ 2 ]
    t.deepEqual( a, e )
} )
test( 'preserves this', t => {
    const x = fn( [ 0, 1, function () {
        return this.x + 2
    } ], { x: 3 } )
    const e = 5
    const a = x[ 2 ]
    t.deepEqual( a, e )
} )
