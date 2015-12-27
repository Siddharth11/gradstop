module.exports = function(grunt) {

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './gradstop.js': './gradstop.es6.js'
                }
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false
                },
                files: {
                    './gradstop.min.js': ['./gradstop.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['./gradstop.es6.js'],
                tasks: ['babel', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['watch']);


}