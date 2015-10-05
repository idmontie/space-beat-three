// Core
var gulp        = require( 'gulp' );
var rename      = require( 'gulp-rename' );
var runSequence = require( 'run-sequence' ).use( gulp );
var browserSync = require('browser-sync').create();

// Build
//var browserify = require( 'gulp-browserify' );
var webpack    = require( 'webpack' );
var stream     = require( 'webpack-stream' );
var minify     = require( 'gulp-minify' );

// Options and settings
var options = {
  filePaths: {
    root : [
      'index.js',
    ],
    core: [
      'src/core/*.js',
      'src/core/**/*.js'
    ],
    framework: [
      'src/framework/*.js',
      'src/framework/**/*.js'
    ],
    game: [
      'src/game/*.js',
      'src/game/**/*.js'
    ]
  },
  entryPoint: 'index',
  buildPath: 'dist/js/',
  servePath: 'dist/'
};

// Tasks
gulp.task('serve', [ 'default' ], function () {
  browserSync.init({
    server: {
      baseDir : './' + options.servePath
    }
  });

  var paths = [].concat( options.filePaths.root )
    .concat( options.filePaths.core )
    .concat( options.filePaths.framework )
    .concat( options.filePaths.game )

  gulp.watch( paths, [ 'build' ] );
});


gulp.task( 'build', function() {
  return gulp.src( options.entryPoint + '.js' )
    .pipe( stream( {
      entry: __dirname + '/' + options.entryPoint + '.js',
      output: {
        path: __dirname + '/' + options.buildPath,
        filename: options.entryPoint + '.js'
      },
      resolve : {
        root : __dirname + '/' + 'src'
      }
    } ) )
    .pipe( gulp.dest( options.buildPath ) )
    .pipe(browserSync.stream());
} );


gulp.task( 'default', function( cb ) {
  runSequence( 'build', cb );
} );