import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	// Paypal
	static payPalEnvironmentSandbox = 'AW8BBBcek2aQQpEmA4GaDHzIdMxggq6VmNmn9ucRQudpxJ4BFTHXcemx37bEUwrrTrUZGPHm8kyEpdua';
	static payPalEnvironmentProduction = '';
	// Default User
	static defaultUser = { name: 'Guest', id: 0, email: '', created_at: '', updated_at: '', role:'' };
	// Backend URL
	static backendURL = 'http://172.19.11.191:1390';
	// Facebook App ID
	static FB_APP_ID = 415680508832695;
	// Google
	static webClientId = '78138799939-v9ggl3se14iv2br3b6qmq1mttsocsd7j.apps.googleusercontent.com';
}