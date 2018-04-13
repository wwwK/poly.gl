const path = require( 'path' )
const buble = require( 'rollup-plugin-buble' )
const alias = require( 'rollup-plugin-alias' )
const cjs = require( 'rollup-plugin-commonjs' )
const replace = require( 'rollup-plugin-replace' )
const node = require( 'rollup-plugin-node-resolve' )
const version = process.env.VERSION || require( '../package.json' ).version

const banner = `/* @preserve
 * poly.gl ${pkg.version}, ${pkg.description}
 * Copyright (c) 2018 ${pkg.author}
 */
`;

const aliases = require( './alias' )
const resolve = p => {
    const base = p.split( '/' )[ 0 ]
    if ( aliases[ base ] ) {
        return path.resolve( aliases[ base ], p.slice( base.length + 1 ) )
    } else {
        return path.resolve( __dirname, '../', p )
    }
}

const builds = {
    // CommonJS
    'cjs': {
        entry: resolve( 'src/index.js' ),
        dest: resolve( 'dist/poly.common.js' ),
        format: 'cjs',
        banner
    },
    // ES Modules
    'esm': {
        entry: resolve( 'src/index.js' ),
        dest: resolve( 'dist/poly.esm.js' ),
        format: 'es',
        banner
    }
}

function genConfig( name ) {
    const opts = builds[ name ]
    const config = {
        input: opts.entry,
        external: opts.external,
        plugins: [
            buble(),
            alias( Object.assign( {}, aliases, opts.alias ) )
        ].concat( opts.plugins || [] ),
        output: {
            file: opts.dest,
            format: opts.format,
            banner: opts.banner,
            name: opts.moduleName || 'Vue'
        }
    }

    if ( opts.env ) {
        config.plugins.push( replace( {
            'process.env.NODE_ENV': JSON.stringify( opts.env )
        } ) )
    }

    Object.defineProperty( config, '_name', {
        enumerable: false,
        value: name
    } )

    return config
}

if ( process.env.TARGET ) {
    module.exports = genConfig( process.env.TARGET )
} else {
    exports.getBuild = genConfig
    exports.getAllBuilds = () => Object.keys( builds ).map( genConfig )
}
