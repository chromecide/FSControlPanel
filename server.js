var FluxNode = require('FluxNode').FluxNode;

new FluxNode({
	mixins: [
		{
			name: 'GroupSecurity',
			options:{
				loginTimeout: 90,
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
			name: __dirname+'/lib/mixins/ApplicationServer/dataInstall.js'
		},
		{
			name: 'websockets'
		},
		{
			name: 'webserver',
			options:{
				autoStart: true, 
				port: 8081
			}
		}
	]
}, function(thisNode){
	thisNode.on('GroupSecurity.UserLoggedIn', function(user){
		console.log('WE HAD A SUCCESS');
		console.log(arguments);
		thisNode.emit('GroupSecurity.SendMessage', {
			user: user.id,
			topic: 'FluxNode.Mixin',
			message:{
				name: 'mixins/GroupSecurity/admin_client',
				options: ''
			}
		});
	})
});
