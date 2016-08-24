/**
 * Gruntfile JS
 * imeOpc
 * 2015-12-10
 */

var Path = require('path');
var banner = '/**\n * imeOpc- v0.0.1\n' +
        ' * author: Don\n' +
        ' * update: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * copyright: http://www.iflytek.com/\n */\n';

//var node_modules = '../../../../node_modules/';
var node_modules = '/disk1/node_modules/';
var imagemin_pngout = require(node_modules + 'imagemin-pngout')();
var imagemin_jpegtran = require(node_modules + 'imagemin-jpegtran')();
var imagemin_gifsicle = require(node_modules + 'imagemin-gifsicle')();
var imagemin_svgo = require(node_modules + 'imagemin-svgo')();

module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                options: {
                    banner: banner,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'target/imeOpc/js/index.js': [
                        'js/platform.js', 'js/base.js', 'js/Share.js', 'js/config.js', 'js/index.js'
                    ],
                }
            }
        },
        cssmin: {
            build: {
                options: {
                    banner: banner
                },
                files: {
                    'target/imeOpc/css/index.css': 'css/index.css',
                }
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: '',
                src: ['*.html'],
                dest: 'target/imeOpc/'
            },
            img: {
                expand: true,
                cwd: 'img/',
                src: '**',
                dest: 'target/imeOpc/img/'
            }
        },
        imagemin: {
            build: {
                options: {
                    use: [imagemin_pngout, imagemin_jpegtran, imagemin_gifsicle, imagemin_svgo]
                },
                files: [{
                        expand: true,
                        cwd: 'target/imeOpc/img/',
                        src: '**/*.{png,jpg,gif,svg}',
                        dest: 'target/imeOpc/img/'
                    }]
            },
        },
        usemin: {
            build: {
                src: ['target/imeOpc/*.html'],
            },
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'target/imeOpc/',
                src: ['*.html'],
                dest: 'target/imeOpc/'
            }
        },
        replace: {
            build: {
                options: {
                    patterns: [{
                            match: 'timestamp',
                            replacement: '<%= grunt.template.today("yyyymmddHHMMss") %>'
                        }],
                },
                files: [
                    {expand: true, flatten: true, src: ['target/imeOpc/*.html'], dest: 'target/imeOpc/'},
                    {expand: true, flatten: true, src: ['target/imeOpc/js/*.js'], dest: 'target/imeOpc/js/'},
                    {expand: true, flatten: true, src: ['target/imeOpc/css/*.css'], dest: 'target/imeOpc/css/'},
                ]
            }
        },
        jshint: {
            debug: {
                options: {
                    force: true,
                    reporter: require(node_modules + 'jshint-html-reporter'),
                    reporterOutput: 'target/imeOpc/cqa/jshint_debug.html',
                },
                files: {
                    src: ['*.js'],
                }
            },
            deploy: {
                options: {
                    force: true,
                    reporter: require(node_modules + 'jshint-html-reporter'),
                    reporterOutput: 'target/imeOpc/cqa/jshint_deploy.html',
                },
                files: {
                    src: ['target/imeOpc/*.js'],
                }
            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-uglify", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-cssmin", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-htmlmin", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-copy", 'tasks'));

    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-imagemin", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-newer", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-replace", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-usemin", 'tasks'));
    grunt.task.loadTasks(Path.join(node_modules, "grunt-contrib-jshint", 'tasks'));

    grunt.registerTask('default', [
        'uglify', 'cssmin',
        'copy:html', 'copy:img',
        'newer:imagemin',
        'usemin',
        'htmlmin',
        'replace',
        'jshint:debug', 'jshint:deploy'
    ]);
};