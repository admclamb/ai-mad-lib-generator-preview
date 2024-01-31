import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiModelTypes } from './openai-model-types';
import OpenAI from 'openai';
import { Category } from 'src/data-model/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: OpenaiService,
      useFactory: async (categoryService: CategoryService) => {
        const apiKey = process.env.OPENAI_API_KEY;

        return new OpenaiService(
          new OpenAI({ apiKey }),
          OpenaiModelTypes.GPT_3_TURBO,
          categoryService,
        );
      },
      inject: [CategoryService],
    },
    CategoryService,
  ],
  exports: [OpenaiService],
})
export class OpenaiModule {}
