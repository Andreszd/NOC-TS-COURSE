import { URL } from 'url';
import { LogRepository } from '../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

const fetch = require('node-fetch');

interface CheckServiceImpl {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceImpl {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly onSuccessCallback: SuccessCallback,
    private readonly onErrorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    let isSuccess: boolean = false;
    try {
      const res = await fetch(new URL('', `https://${url}`));

      if (res.ok) {
        isSuccess = true;
        const successLog = new LogEntity(LogSeverityLevel.low, `${url} working`);
        this.logRepository.save(successLog);
        this.onSuccessCallback();
      } else {
        throw new Error('Error on check service');
      }
    } catch (error) {
      isSuccess = false;
      this.onErrorCallback(`${error}`);
    } finally {
      return isSuccess;
    }
  }
}
