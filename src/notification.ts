import axios from 'axios';
import 'dotenv/config';

// Define credential types
export type TelegramCredentials = {
  botToken: string;
  channelId: string;
};

export type TwitterCredentials = {
  apiKey: string;
  apiSecret: string;
};

// Union of all possible credentials
type NotificationCredentials = TelegramCredentials | TwitterCredentials;

// NotificationService interface
interface NotificationService {
  sendNotification(message: string): Promise<void>;
}

// TelegramNotificationService implementation
class TelegramNotificationService implements NotificationService {
  private botToken: string;
  private channelId: string;

  constructor(credentials: TelegramCredentials) {
    const { botToken, channelId } = credentials;
    if (!botToken || !channelId) {
      throw new Error('Telegram credentials are missing');
    }
    this.botToken = botToken;
    this.channelId = channelId;
  }

  async sendNotification(message: string): Promise<void> {
    const sendUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage?chat_id=${this.channelId}&&parse_mode=markdown&text=${encodeURIComponent(
      message
    )}`;
    console.log(sendUrl);

    try {
      console.log(`[+] Sending the message to Telegram`);
      await axios.get(sendUrl);
    } catch (error) {
      // Added if (error instanceof Error) to check if the error is an Error object before accessing its message property.
      if (error instanceof Error) {
        console.error(`[-] Error while sending message to Telegram: ` + error);
        //throw new Error(error.message);
      } else {
        // Fallback for unknown error types
        console.error('[-] Unknown error occurred while sending message.');
        //throw new Error('Unknown error');
      }
    }
  }
}

// TwitterNotificationService implementation (mock example)
class TwitterNotificationService implements NotificationService {
  private apiKey: string;
  private apiSecret: string;

  constructor(credentials: TwitterCredentials) {
    const { apiKey, apiSecret } = credentials;
    if (!apiKey || !apiSecret) {
      throw new Error('Twitter credentials are missing');
    }
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async sendNotification(message: string): Promise<void> {
    console.log(`[+] Simulating sending the message to Twitter`);
    console.log(`Message: ${message}`);
  }
}

// Factory method dynamically creates the appropriate notification service and narrows the credential type with as.
class NotificationServiceFactory {
  static createService(platform: string, credentials: NotificationCredentials): NotificationService {
    switch (platform) {
      case 'telegram':
        return new TelegramNotificationService(credentials as TelegramCredentials);

      case 'twitter':
        return new TwitterNotificationService(credentials as TwitterCredentials);

      default:
        throw new Error('Unsupported notification platform');
    }
  }
}

// Function to send a message via the appropriate service
async function sendMessage(platform: 'telegram' | 'twitter', message: string, credentials: NotificationCredentials) {
  try {
    const service = NotificationServiceFactory.createService(platform, credentials);
    await service.sendNotification(message);
    console.log(`[+] Message successfully sent via ${platform}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[-] Failed to send message via ${platform}: ` + error.message);
    } else {
      console.error(`[-] An unknown error occurred while sending the message`);
    }
  }
}

// Initialize Notification Services
const createNotificationService = () => {
  const service = process.env.NOTIFICATION_SERVICE || 'telegram';

  if (service === 'telegram') {
    const credentials: TelegramCredentials = {
      botToken: process.env.TELEGRAM_BOT_TOKEN as string,
      channelId: process.env.TELEGRAM_CHANNEL_ID as string
    };

    // Check for missing credentials
    if (!credentials.botToken || !credentials.channelId) {
      throw new Error('Missing Telegram credentials. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID in your environment variables.');
    }

    return NotificationServiceFactory.createService(service, credentials);
  }

  throw new Error(`Unsupported notification service: ${service}`);
};

// Exports for external use
export { sendMessage, NotificationServiceFactory, NotificationCredentials, createNotificationService };
