module.exports = function(grunt) {

    grunt.initConfig({
        env: {
            prod: {
                NODE_ENV: 'production'
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify']
                    ],
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: ['src/*.js'],
                dest: 'dist/gradstop.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false
                },
                files: {
                    'dist/gradstop.min.js': ['dist/gradstop.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['browserify', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['env', 'watch']);
    grunt.registerTask('build', ['env', 'browserify', 'uglify']);

}