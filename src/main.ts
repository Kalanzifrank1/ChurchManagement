import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Strict CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:3000', // Your Next.js local development server
      'https://yourproductiondomain.com', // Your live frontend URL (when deployed)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies / Authorization headers if needed
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
