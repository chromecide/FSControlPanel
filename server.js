var FluxNode = require('FluxNode').FluxNode;

new FluxNode({
	mixins: [
		{
			name: 'GroupSecurity',
			options:{
				loginTimeout: 10,
				method: 'permission',
				/*store: {
					databaseName: 'tunnel_auth_test'
				},*/
				protectedTopics:{
					
				},
				unprotectedTopics: {
					'hello': true
				}
			}
		},
		{
			name: __dirname+'/lib/mixins/ApplicationServer'
		},
		{
			name: 'websockets'
		}
	]
}, function(thisNode){
	
});
