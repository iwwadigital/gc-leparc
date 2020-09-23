/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {
  output as pagespeed
} from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['app/scripts/**/*.js', '!node_modules/**'])
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);

// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('www/images'))
  .pipe($.size({
    title: 'images'
  }))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'app/*',
    'app/fonts/**/*', // Added by Marcelo
    'app/templates/includes/*.svg', // Added by Marcelo
    '!app/*.html',
    'node_modules/apache-server-configs/www/.htaccess'
  ], {
    dot: true,
    base: 'app' // Added by Marcelo // Support Recursive
  })
  .pipe(gulp.dest('www'))
  .pipe($.size({
    title: 'copy'
  }))
);

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      'app/styles/**/*.scss',
      'app/styles/**/*.css'
    ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({
      title: 'styles'
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('www/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () =>
  gulp.src([
    // Note: Since we are not using useref in the scripts build pipeline,
    //       you need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './app/scripts/main.js',
    // Other scripts
    './app/bower_components/ionic/js/ionic.bundle.js',

    // './app/bower_components/angular/angular.js',
    // './app/bower_components/angular-animate/angular-animate.js',
    // './app/bower_components/angular-sanitize/angular-sanitize.js',
    // './app/bower_components/angular-ui-router/release/angular-ui-router.js',
    // './app/bower_components/ionic/js/ionic.js',
    // './app/bower_components/ionic/js/ionic-angular.js',

    './app/scripts/global.js',
    './app/bower_components/ngCordova/dist/ng-cordova.js',
    './app/scripts/providers/onesignal.js',
    './app/bower_components/angular-ui-mask/dist/mask.js',
    './app/bower_components/onezone-datepicker/dist/onezone-datepicker.min.js',

    './app/scripts/app.js',
    './app/scripts/app-routes.js',
    './app/scripts/app-config.js',
    './app/scripts/theme-config.js',

    './app/scripts/constants/session-const.js',

    './app/scripts/plugins/toaster-svc.js',
    './app/scripts/plugins/photo-svc.js',

    './app/scripts/services/ajax-svc.js',
    './app/scripts/services/auth-svc.js',
    './app/scripts/services/config-svc.js',
    './app/scripts/services/login/login-svc.js',
    './app/scripts/services/menu-svc.js',
    './app/scripts/services/localstorage-svc.js',
    './app/scripts/services/loader-svc.js',
    './app/scripts/services/user/perfil-svc.js',
    './app/scripts/services/user/visitante-svc.js',
    './app/scripts/services/user/relatorio-acesso-svc.js',
    './app/scripts/services/main/agendamentos-svc.js',
    './app/scripts/services/main/classificados-svc.js',
    './app/scripts/services/main/eventos-svc.js',
    './app/scripts/services/main/forum-svc.js',
    './app/scripts/services/main/informacoes-svc.js',
    './app/scripts/services/main/midia-svc.js',
    './app/scripts/services/main/notificacoes-svc.js',
    './app/scripts/services/main/ouvidoria-svc.js',
    './app/scripts/services/main/recent-posts-svc.js',
    './app/scripts/services/main/telefones-uteis-svc.js',
    './app/scripts/services/main/transparencias-svc.js',

    './app/scripts/services/main/documentos-nao-auditados-svc.js',

    './app/scripts/providers/filters/angular-locale-pt-br.js',
    './app/scripts/providers/filters/carplate.js',
    './app/scripts/providers/filters/i18n.js',
    './app/scripts/providers/filters/startsWith.js',
    './app/scripts/providers/filters/telephone.js',
    './app/scripts/providers/filters/trust-html-filter.js',

    './app/scripts/directives/cards-dir.js',
    './app/scripts/directives/file-upload.js',
    './app/scripts/directives/search-dir.js',

    './app/scripts/controllers/login/login-ctrl.js',
    './app/scripts/controllers/login/login-info-ctrl.js',
    './app/scripts/controllers/app-ctrl.js',
    './app/scripts/controllers/home-ctrl.js',
    './app/scripts/controllers/slideshow-ctrl.js',
    './app/scripts/controllers/main/agenda-servicos-ctrl.js',
    './app/scripts/controllers/main/classificado-ctrl.js',
    './app/scripts/controllers/main/classificado-novo-ctrl.js',
    './app/scripts/controllers/main/classificados-ctrl.js',
    './app/scripts/controllers/main/evento-ctrl.js',
    './app/scripts/controllers/main/eventos-ctrl.js',
    './app/scripts/controllers/main/forum-ctrl.js',
    './app/scripts/controllers/main/forum-novo-post-ctrl.js',
    './app/scripts/controllers/main/forum-post-ctrl.js',
    './app/scripts/controllers/main/forum-regras-ctrl.js',
    './app/scripts/controllers/main/informacao-ctrl.js',
    './app/scripts/controllers/main/informacoes-ctrl.js',
    './app/scripts/controllers/main/ouvidoria-novo-chamado-ctrl.js',
    './app/scripts/controllers/main/ouvidoria-ocorrencia-ctrl.js',
    './app/scripts/controllers/main/ouvidoria-ocorrencias-ctrl.js',
    './app/scripts/controllers/main/telefones-uteis-ctrl.js',
    './app/scripts/controllers/main/transparencia-ctrl.js',
    './app/scripts/controllers/main/transparencias-ctrl.js',

    './app/scripts/controllers/main/documento-nao-auditado-ctrl.js',
    './app/scripts/controllers/main/documentos-nao-auditados-ctrl.js',

    './app/scripts/controllers/user/agendamento-ctrl.js',
    './app/scripts/controllers/user/agendamentos-ctrl.js',
    './app/scripts/controllers/user/alterar-senha.js',
    './app/scripts/controllers/user/configuracoes-ctrl.js',
    './app/scripts/controllers/user/editar-perfil-ctrl.js',
    './app/scripts/controllers/user/notificacoes-ctrl.js',
    './app/scripts/controllers/user/perfil-ctrl.js',
    './app/scripts/controllers/user/visitante-ctrl.js',
    './app/scripts/controllers/user/visitante-novo-ctrl.js',
    './app/scripts/controllers/user/visitantes-ctrl.js',

    './app/bower_components/angular-input-masks/angular-input-masks-standalone.js'
  ])
  .pipe($.newer('.tmp/scripts'))
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('.tmp/scripts'))
  .pipe($.concat('main.min.js'))
  .pipe($.uglify({
    preserveComments: 'some'
  }))
  // Output files
  .pipe($.size({
    title: 'scripts'
  }))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('www/scripts'))
  .pipe(gulp.dest('.tmp/scripts'))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

  // Minify any HTML
  .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({
      title: 'html',
      showFiles: true
    })))
    .pipe(gulp.dest('www'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'www/*', '!www/.git'], {
  dot: true
}));

// Watch files for changes & reload
gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  // gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['scripts', reload]); // Added by Marcelo
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'www',
    port: 3001
  })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles',
    // ['lint', 'html', 'scripts', 'images', 'copy'],
    ['html', 'scripts', 'images', 'copy'], // Added by Marcelo
    'generate-service-worker',
    cb
  )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('example.com', {
    strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
  }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('www/scripts/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'www';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`,
      `${rootDir}/fonts/**/*` // Added by Marcelo
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
