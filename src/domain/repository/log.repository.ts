import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export interface LogRepository {
  save(log: LogEntity): Promise<boolean>;
  get(severity: LogSeverityLevel): Promise<LogEntity[]>;
  clean(): Promise<boolean>;
}
