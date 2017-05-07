const makeProxy = require( 'proxify-objects' )
const isFunc = require( 'is-fn' )
const memoize = require( 'fast-memoize' )
const log = a => {
    console.log( a );
    return a
}
const exportable = ( withMemoization = true ) => {
    return ( arr, ctx, ...args ) => {
        const obj = arr.reduce( ( acc, el, i ) => {
            if ( isFunc( el ) ) {
                const fn = withMemoization ? memoize( el.bind( ctx ) ) : el
                const runFn = function () {
                    return fn.apply( ctx, [ i ].concat( args ) )
                }
                acc[ i ] = runFn
            }
            return acc
        }, {} )
        return makeProxy( arr, obj )
    }
}
lazy( [ 0, 1, 2, 3, () => 4 ] )
module.exports = exportable( true )
module.exports.noMemoization = exportable( false )
