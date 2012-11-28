var loginWindow = {
	loginWindow_Settings:{
		dialog: false
	},
	init: function(cfg, callback){
		var thisNode = this;
		var loginDialog = new FluxUI.Dialog({
			name: 'LoginWindow',
			title: 'Login',
			size:{
				height: 150,
				width:400
			},
			dashlets: [
				{
					type: 'form',
					name: 'loginWindowForm',
					options: {
						fields: [
							{
								type: 'form/inputfield',
								name: 'username',
								options:{
									type: 'text',
									label: 'Username'
								}
							},
							{
								type: 'form/inputfield',
								name: 'password',
								options:{
									type: 'password',
									label: 'Password'
								}
							}
						]
					}
				}
			],
			buttons:[
				{
					name: 'LoginWindow_LoginButton',
					options:{
						display: 'Login',
						clickEvent:{
							name: 'LoginWindow.LoginButton.Click'
						}
					}
				},
				{
					name: 'LoginWindow_CancelButton',
					options:{
						display: 'Cancel',
						clickEvent:{
							name: 'LoginWindow.Hide'
						}
					}
				}
			]
		}, function(dlg){	
			thisNode.loginWindow_Settings.dialog = dlg;
			thisNode.on('LoginWindow.Show', function(message, rawMessage){
				thisNode.loginWindow_Show();
			});
			
			thisNode.on('LoginWindow.Hide', function(message, rawMessage){
				thisNode.loginWindow_Hide();
			});
			
			thisNode.on('LoginWindow.LoginButton.Click', function(message, rawMessage){
				thisNode.loginWindow_ProcessLogin();
			});
			
			if(callback){
				callback({
					name: 'loginWindow'
				});
			}
			
			thisNode.emit('Mixin.Ready', {
				name: 'loginWindow'
			});
		});
	},
	loginWindow_Show: function(){
		var thisNode = this;
		
		thisNode.loginWindow_Settings.dialog.show();
		thisNode.emit('LoginWindow.Shown', {});
	},
	loginWindow_Hide: function(){
		var thisNode = this;
		
		thisNode.loginWindow_Settings.dialog.hide();
		thisNode.emit('LoginWindow.Hidden', {});
	},
	loginWindow_ProcessLogin: function(){
		var thisNode = this;
		
		thisNode.loginWindow_Settings.dialog.hide();
		var formDashlet = thisNode.loginWindow_Settings.dialog.dashlets[0];
		formDashlet.getValues(function(valObject){
			thisNode.emit('LoginWindow.Login', valObject);
		});
	}
}

define([], function(){
	return loginWindow;
})
