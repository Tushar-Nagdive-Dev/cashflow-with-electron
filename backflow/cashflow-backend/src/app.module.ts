import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

     // Configure TypeORM with PostgreSQL
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'cashflow_dev',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'cashflow_db',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true,      // Automatically sync schema (development only)
      logging: true,          // Log SQL queries for debugging
    }),    

    UsersModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
