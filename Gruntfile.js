module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['vendor/jquery-1.x/production/*'],
						dest: 'dist/js/'
					},
					{
						src: ['demo.html'],
						dest: 'dist/demo.html'
					}
				]
			}
		},
		cssmin: {
			dist: {
				files: {
					'dist/css/jquery.select-bootstrap.min.css': [
						'css/select-bootstrap.css'
					]
				}
			}
		},
		uglify: {
			options: {
				mangle: false,
				sourceMap: true
			},
			dist: {
				files: {
					'dist/js/jquery.select-bootstrap.min.js': [
						'vendor/bootstrap-3.x/custom/dropdown/bootstrap.js',
						'js/jquery.select-bootstrap.js'
					]
				}
			}
		},
		compress: {
			dist: {
				options: {
					archive: 'dist/jquery.select-bootstrap.zip'
				},
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: ['css/*', 'js/*'],
						dest: ''
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('dist', ['copy:dist', 'cssmin:dist', 'uglify:dist', 'compress:dist']);
};