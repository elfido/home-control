module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: {
          except: ['external.js']
        },
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files:{
          "public/resources/js/global/<%= pkg.name %>.min.js": ["public/resources/js/global/*.js"]
        } 
      }
    },
    concat: {
      //jQuery, Bootstrap, CanJS, underscore
      externalJS: {
        dest: "public/resources/js/global/external.min.js",
        src: ["bower_components/jquery/dist/jquery.min.js","bower_components/bootstrap/dist/js/bootstrap.min.js", "bower_components/canjs/can.jquery.min.js", "bower_components/underscore/underscore-min.js"]
      },
      externalCSS: {
        dest: "public/resources/css/globalstyles.min.css",
        src: ["bower_components/bootstrap/dist/css/bootstrap.min.css","bower_components/fontawesome/css/font-awesome.min.css"]
      }
    },
    comments: {
      src: "public/resources/js/glboal/*.min.js"
    },
    copy: {
      main: {
        files: [
          {expand: false, src: ['bower_components/jquery/dist/jquery.min.map'], dest: 'public/resources/js/global/jquery.min.map', filter: 'isFile'},
          {expand: false, src: 'bower_components/moment-timezone/moment-timezone.js', dest: 'public/resources/js/moment/moment-timezone.js'},
          {expand: false, src: 'bower_components/moment/moment.js', dest: 'public/resources/js/moment/moment.js'},
          //{expand: true, flatten: true, src: 'bower_components/moment/locale/*.*', dest: 'public/resources/js/moment/locale/', filter: 'isFile'}
        ]
      },
      fonts: {
        files:[
          {expand: true, flatten: true, src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'public/resources/fonts/', filter: 'isFile'}
        ]
      }
    },
    clean: ["public/resources/js/global/<%= pkg.name %>.min.js","public/resources/js/global/jquery.min.map","public/resources/js/global/external.min.js","public/resources/css/globalstyles.css"]
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s). Always clean and uglify first
  grunt.registerTask('default', ['clean','uglify','copy','comments','concat']);

};