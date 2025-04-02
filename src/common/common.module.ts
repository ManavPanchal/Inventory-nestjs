import { Module } from '@nestjs/common';
import { GlobalException } from './filters/GlobalException.filter';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [{ provide: 'APP_FILTER', useClass: GlobalException }],
})
export class CommonModule {}
