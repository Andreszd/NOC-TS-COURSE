import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDataSource {
  abstract save(log: LogEntity): Promise<boolean>;
  abstract get(severity: LogSeverityLevel): Promise<LogEntity[]>;
  abstract clean(): Promise<boolean>;
}
