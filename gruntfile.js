module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dev/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    assemble: {
      options: {
        assets: 'assets',
        partials: ['dev/template/partials/**/*.hbs'],
        data: 'dev/template/data/**/*',
        layoutdir: 'dev/template/layout/',
        layout: ['default.hbs'],
        flatten: true
      },
      site: {
        src: ['dev/template/*.hbs'],
        dest: 'dev/site/'
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/assets/css/scss',
          src: ['*.scss'],
          dest: 'dev/assets/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      options: {
      shorthandCompacting: false,
      roundingPrecision: -1
      },
      combine: {
        files: {
          'build/css/style.min.css': ['dev/assets/css/*.css']
        }
      }
    },
    copy: {
      main:{
        files: [
          {expand: true, flatten: true, src: './dev/site/*', dest:'./build/'},
          {
            expand: true,
            cwd:'./dev/assets/',
            src: ['**', '!**/css/**'],
            dest: 'build/'}
        ],
      },
    },
    clean: {
      build: ['./build']
    },
    watch: {
      options: {
        livereload: true,
      },
      build: {
        files: ['dev/**/*'],
        tasks: ['assemble', 'clean', 'sass', 'copy', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-serve');

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assemble');

  // Default Task Overview:
  // (1) Builds site
  // (2) Cleans up previous build folder
  // (3)copies built site into build

  grunt.registerTask('default', ['assemble', 'clean', 'sass', 'copy', 'cssmin', 'watch'])
}
