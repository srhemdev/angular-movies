module.exports = function(grunt) {
    grunt.file.defaultEncoding = 'utf-8';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: 'app/sass',
                    cssDir: 'app/css'
                },
                
                compile: {}
            }
        },
        watch: {
            css: {
                files: 'x',
                tasks: ['compass']
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
              // the files to concatenate
              src: ['app/js/*.js'],
              // the location of the resulting JS file
              dest: 'app/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
              options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
              },
              dist: {
                files: {
                  'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin : {
           css:{
               src: 'app/css/main.css',
               dest: 'app/css/main.min.css'
           }
       },
        ngdocs: {
          options:{dest: 'docs'},
          api:{
          src:['app/js/app.js'],
          title:'API Documentation'
          }
        },
        clean: ['docs']
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default',['clean','compass', 'concat', 'uglify', 'cssmin']);
}
