'use strict';

module.exports = function(grunt) {

	var ui5version = '1.38.5'
    var ui5repo = 'openui5.hana.ondemand.com'

	// Project configuration.
	grunt.initConfig({

		// Configuration to be run (and then tested).
	    openui5_preload: {
	        component: {
	            options: {
	                resources: {
	                    cwd: 'src/main/webapp', // path to app root folder
	                    src: [
						  '**/*.js',
						  '**/*.fragment.html',
						  '**/*.fragment.json',
						  '**/*.fragment.xml',
						  '**/*.view.html',
						  '**/*.view.json',
						  '**/*.view.xml',
						  '**/*.properties'
						],
	                    prefix: 'com/penninkhof/pentagon'
	                },
					compress: true,
					dest: 'dist'
	            },
	            components: true
	        }
	    },

		// Local server
		connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: {
                        path: '.',
                        index: 'index.html',
                    },
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        return [require('grunt-connect-proxy/lib/utils').proxyRequest].concat(defaultMiddleware);
                    }
                },
                proxies: [
                    {
                        context: '/resources',
                        host: ui5repo,
                        changeOrigin: true,
                        port: 443,
                        https: true,
                        rewrite: {
                            '^/resources': '/' + ui5version + '/resources'
                        }
                    }
                ]
            }
        }


	});

	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');

	// grunt.registerTask('default', [ 'openui5_preload']);
	grunt.registerTask('default', [
        'configureProxies:server',
        'connect:server']);

};
