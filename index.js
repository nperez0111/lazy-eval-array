const makeProxy = require( 'proxify-objects' )
const isFunc = require( 'is-fn' )
const memoize = require( 'fast-memoize' )
const log = a => {
    console.log( a );
    return a
}
const exportable = ( withMemoization, promisify ) => {
    const transform = obj => promisify ? Promise.resolve( obj ) : obj

    return ( arr, ctx ) => {
        const obj = arr.reduce( ( acc, el, i ) => {
            if ( isFunc( el ) ) {
                const fn = withMemoization ? memoize( el.bind( ctx ) ) : el

                const runFn = () => transform( fn.apply( ctx, [ i ].concat( Array.prototype.slice.call( arguments, 2 ) ) ) )

                acc[ i ] = runFn
            } else {
                if ( promisify ) {
                    acc[ i ] = () => transform( el )
                }
            }
            return acc
        }, {} )
        return makeProxy( arr, obj )
    }
}

module.exports = exportable( true, false )
module.exports.noMemoization = exportable( false, false )
module.exports.promisify = exportable( true, true )
module.exports.promisify.noMemoization = exportable( false, true )
