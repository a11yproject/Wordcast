module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'pubic/javascripts/libs/*.js',
					'public/javascripts/*.js'
				],
				dest: 'public/javascripts/build/production.js',
			}
		},

		uglify: {
			build: {
				src: 'public/javascripts/build/production.js',
				dest: 'public/javascripts/build/production.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/build/global.css': 'public/scss/main.scss'
				}
			} 
		},

		watch: {
			scripts: {
				files: ['public/javascripts/*.js', 'public/javascripts/libs/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
					livereload: true,
				},
			},

			css: {
				files: ['public/scss/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
					livereload: true,
				}
			} 
		},

		curl: {
			bootstrap_css: {
				src: 'http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css',
				dest: 'public/lib/bootstrap/css/bootstrap.min.css'
			},

			bootstrap_js: {
				src: 'http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js',
				dest: 'public/lib/bootstrap/js/bootstrap.min.js'
			}
		},

		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					watchedFolders: ['routes'],
					nodeArgs: ['--debug'],
					env: {
						PORT: '3000'
					}
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['watch', 'nodemon'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin', 'curl']);
	grunt.registerTask('update', ['curl']);
	grunt.registerTask('dev', ['concurrent']);

};