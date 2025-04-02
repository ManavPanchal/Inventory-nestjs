import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/database/enitities/product.entity';
import { ProductService } from './product.service';
// import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  // providers: [ProductService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  exports: [SequelizeModule],
})
export class ProductModule {}
