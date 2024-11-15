import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  public client: PrismaClient;

  constructor() {
    // super para chamar a classe extentida
    super();
  }
  onModuleDestroy() {
    return this.$disconnect();
  }
  onModuleInit() {
    return this.$connect();
  }
}
