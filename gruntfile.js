module.exports = function(grunt) {

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/gradstop.js': 'src/gradstop.es6.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/polyfill.js', 'dist/gradstop.js'],
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
                tasks: ['babel', 'concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['watch']);


}