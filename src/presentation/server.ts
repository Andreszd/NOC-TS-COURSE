import { CheckService } from '../domain/use-cases/check-service';
import { FileSystemDataSource } from '../infrastructure/datasource/file-sys.datasource';
import { LogRepositoryImpl } from '../infrastructure/repository/log-impl.repository';
import { CronService } from './cron/cron-service';

const logRepository = new LogRepositoryImpl(new FileSystemDataSource());

export class ServerApp {
  public static run() {
    const checker = new CheckService(
      logRepository,
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
