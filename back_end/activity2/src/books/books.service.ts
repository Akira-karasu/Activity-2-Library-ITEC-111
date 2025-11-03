import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './entity/book.entity';
import { Category } from './entity/category.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async createBook(dto: CreateBookDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    const book = this.bookRepo.create({ ...dto, category });
    return this.bookRepo.save(book);
  }

  async getCategories() {
    return this.categoryRepo.find({ relations: ['books'] });
  }

  async getBooks() {
    return this.bookRepo.find({ relations: ['category'] });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
  await this.categoryRepo.update(id, dto);
  return this.categoryRepo.findOne({ where: { id }, relations: ['books'] });
}

async removeCategory(id: number) {
  return this.categoryRepo.delete(id);
}

async updateBook(id: number, dto: UpdateBookDto) {
  let category: Category | undefined = undefined;

  if (dto.categoryId) {
    const foundCategory = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!foundCategory) throw new NotFoundException('Category not found');
    category = foundCategory;
  }

  const { categoryId, ...rest } = dto; // ✅ strip categoryId

  await this.bookRepo.update(id, { ...rest, category }); // ✅ correct
  return this.bookRepo.findOne({ where: { id }, relations: ['category'] });
}


async removeBook(id: number) {
  return this.bookRepo.delete(id);
}

async searchBooksByTitle(query: string) {
  return this.bookRepo.find({
    where: [
      { title: ILike(`%${query}%`) },
      { author: ILike(`%${query}%`) }
    ],
    relations: ['category'],
  });
}
}
