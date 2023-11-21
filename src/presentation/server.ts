import { CheckService } from '../domain/use-cases/check-service';
import { CronService } from './cron/cron-service';

export class ServerApp {
  public static run() {
    const checker = new CheckService(
      () => {
        console.log('active service');
      },
      (error) => {
        console.error(error);
      }
    );
    const cron = new CronService('*/3 * * * * *', () => {
      checker.execute('www.google.com');
    });

    cron.run();
  }
}
