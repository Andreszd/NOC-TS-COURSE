import { LogEntity } from '../entities/log.entity';

export interface LogRepositoryImpl {
  save(): void;
  get(): Promise<LogEntity>;
  clean(): void;
}
