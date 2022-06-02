import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.asistenbelanja',
  appName: 'Asisten Belanja',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
};

export default config;
