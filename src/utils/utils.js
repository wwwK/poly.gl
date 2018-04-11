import assert from './assert';

const uidCounters = {};

/**
 * Returns a UID.
 * @param {String} id= - Identifier base name
 * @return {number} uid
 **/
export function uid( id = 'id' ) {
    uidCounters[ id ] = uidCounters[ id ] || 1;
    const count = uidCounters[ id ]++;
    return `${id}-${count}`;
}

/**
 * Verifies if a given number is power of two or not.
 * @param {object} n - The number to check.
 * @return {Array} Returns true if the given number is power of 2, false otherwise.
 **/
export function isPowerOfTwo( n ) {
    assert( ( typeof n === 'number' ), 'Input must be a number' );
    return n && ( ( n & ( n - 1 ) ) === 0 );
}

// Returns true if given object is empty, false otherwise.
export function isObjectEmpty( obj ) {
    let isEmpty = true;
    /* eslint-disable no-unused-vars  */
    for ( const key in obj ) {
        isEmpty = false;
        break;
    }
    /* eslint-enable no-unused-vars  */
    return isEmpty;
}

// export function merge( target, ...sources ) {
//
//     assert( typeof target !== 'object', 'parameter 1 must be a object' );
//
//     for ( let i = 0; i < sources.length; i++ ) {
//         const source = sources[ i ];
//
//         if ( source === null || source === undefined ) continue;
//
//         for ( const key in source ) {
//             if ( Object.prototype.hasOwnProperty.call( source, key ) ) {
//                 target[ key ] = source[ key ];
//             }
//         }
//     }
//     return target;
// }

export const merge = Object.assign
