import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/data-model';
import { FindManyOptions, LessThan, Like, Repository } from 'typeorm';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { PaginationResponse } from 'src/adlib/dto/pagination-response';
import { Pagination } from 'src/common/pagination/pagination';
import { FeedTypes } from 'src/models/feed-type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllPageable(
    categoryPaginationDto: CategoryPaginationDto,
  ): Promise<PaginationResponse<Category>> {
    const queryOptions: FindManyOptions<Category> = {
      where: {
        createdAt: LessThan(categoryPaginationDto.timestamp),
      },
      order: this.calculateOrder(categoryPaginationDto),
    };

    if (categoryPaginationDto.category) {
      queryOptions.where['name'] = Like(
        `%${categoryPaginationDto.category.toLowerCase()}%`,
      );
    }

    console.log('WHERE: ', queryOptions.where);

    return Pagination.paginate<Category>(
      this.categoryRepository,
      categoryPaginationDto,
      queryOptions,
    );
  }

  private calculateOrder(categoryPaginationDto: CategoryPaginationDto): {
    createdAt: 'DESC' | 'ASC';
  } {
    const createdAt =
      categoryPaginationDto.feedType === FeedTypes.LATEST
        ? 'DESC'
        : categoryPaginationDto.feedType === FeedTypes.OLDEST
        ? 'ASC'
        : 'DESC';
    return {
      createdAt,
    };
  }

  findByName(categoryName: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: {
        name: categoryName,
      },
    });
  }
}
