import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
 
import { PushNotifications, ActionPerformed } from '@capacitor/push-notifications';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/app';
import { updateUser } from '../store/actions/user/user.actions';
 
@Injectable({
  providedIn: 'root'
})
export class FcmService {
 
	constructor(
		private router: Router,
		private store: Store<AppState>,
	) { }
 
	initPush() {
		if (Capacitor.getPlatform() !== 'web') {
			this.registerNotifications();
		}
	}

	/**
	 * Check permission then register if granted
	 */
	async registerNotifications() {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive == 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
		await this.obtainer();
	}

	/**
	 * Obtainer
	 */
	async obtainer() {
		await PushNotifications.addListener('registration', token => {
			this.store.dispatch(updateUser({
				data: {
					meta: {
						_fcm_token: token.value,
					}
				}
			}));
		});

		await PushNotifications.addListener('registrationError', err => {
			console.error('Registration error: ', err.error);
		});

		await PushNotifications.addListener('pushNotificationReceived', notification => {
			console.log('Push notification received: ', notification);
		});

		await PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
			console.log('Push notification action performed', notification.actionId, notification.inputValue);
			this.router.navigateByUrl(`tabs/order/${notification.notification.data.orderId}`);
		});
	}
	
	async performClearNotifications() {
		if (Capacitor.getPlatform() !== 'web') {
			await PushNotifications.removeAllDeliveredNotifications();
		}
	}

	clearNotifications() {
		this.performClearNotifications();
	}
}