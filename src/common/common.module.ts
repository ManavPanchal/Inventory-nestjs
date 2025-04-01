import { Module } from '@nestjs/common';
import { GlobalException } from './filters/GlobalException.filter';

@Module({
  providers: [{ provide: 'APP_FILTER', useClass: GlobalException }],
})
export class CommonModule {}
