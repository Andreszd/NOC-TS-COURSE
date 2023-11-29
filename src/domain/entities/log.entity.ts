export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  severity: LogSeverityLevel;
  message: string;
  createdAt: Date;

  constructor(severity: LogSeverityLevel, message: string, createdAt = new Date()) {
    this.message = message;
    this.severity = severity;
    this.createdAt = createdAt;
  }

  /* factory constructor */
  static fromJson(json: string): LogEntity {
    const { message, severity, createdAt } = JSON.parse(json);

    return new LogEntity(severity, message, createdAt);
  }
}
