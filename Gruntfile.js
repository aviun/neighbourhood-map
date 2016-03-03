module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/js/main.js': ['src/js/main.js']
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/style.css': 'src/css/style.css'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};