import { CronJob } from 'cron';

/* use interface with its object with properties */
/* type for new data type */

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  private worker: CronJob;
  constructor(pattern: CronTime, callback: OnTick) {
    this.worker = new CronJob(pattern, callback);
  }

  run(): void {
    this.worker.start();
  }
}
