import {getContext} from './activities/interceptors';

export interface BookingFlow {
    userId: string;
    grantorId: string;
}

export async function greet(name: string): Promise<string> {
  // throw new Error('activity failed');
  const { logger } = getContext();
  logger.info(`Log from activity ${name}`);
  return `Hello, ${name}!`;
}

// db will be of type MongoDB connection
export const providerActivities = (db: any) => ({
    async search(search: string): Promise<void> {
      // do something with db: await db.find(...)
      return new Promise((resolve) => resolve());
    }
})
