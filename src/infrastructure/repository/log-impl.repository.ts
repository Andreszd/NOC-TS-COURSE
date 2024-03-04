import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDataSource) {}

  async save(log: LogEntity): Promise<boolean> {
    return this.logDatasource.save(log);
  }
  get(severity: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.get(severity);
  }
  async clean(): Promise<boolean> {
    return this.logDatasource.clean();
  }
}
