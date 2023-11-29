import fs from 'fs';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const severityPaths = {
  [LogSeverityLevel.high]: 'high-logs.log',
  [LogSeverityLevel.medium]: 'medium-logs.log',
  [LogSeverityLevel.low]: 'low-logs.log',
} as const;

export class FileSystemDataSource implements LogDataSource {
  private readonly basePath = 'logs/';

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles(): void {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath);
    } else {
      Object.values(severityPaths).forEach((path) => {
        const finalPath = `${this.basePath}${path}`;
        if (!fs.existsSync(finalPath)) {
          fs.writeFileSync(finalPath, '');
        }
      });
    }
  }

  save(log: LogEntity): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const path = `${this.basePath}${severityPaths[log.severity]}`;
        fs.appendFileSync(path, `${JSON.stringify(log)} \n`, 'utf-8');
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  get(severity: LogSeverityLevel): Promise<LogEntity[]> {
    return new Promise((resolve, reject) => {
      try {
        const path = `${this.basePath}${severityPaths[severity]}`;
        const data = fs.readFileSync(path, 'utf8');
        const logsAsTextLiteral = data.split(/\n/);

        resolve(logsAsTextLiteral.map(LogEntity.fromJson));
      } catch (error) {
        reject(error);
      }
    });
  }
  clean(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
