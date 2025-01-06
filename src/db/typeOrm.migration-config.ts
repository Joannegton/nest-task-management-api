import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {
  DataSource,
  DataSourceOptions,
} from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';

config();

const configService =
  new ConfigService();

const dataSourceOptions: DataSourceOptions =
  {
    type: 'postgres',
    host: configService.get(
      'DB_HOST',
    ),
    port: parseInt(
      configService.get(
        'DB_PORT',
      ),
    ),
    username:
      configService.get(
        'DB_USER',
      ),
    password:
      configService.get(
        'DB_PASSWORD',
      ),
    database:
      configService.get(
        'DB_NAME',
      ),
    synchronize:
      false,
    entities:
      [
        TaskEntity,
        UserEntity,
      ],
    migrations:
      [
        'dist/db/migrations/*.js',
      ],
  };

export default new DataSource(
  dataSourceOptions,
);
