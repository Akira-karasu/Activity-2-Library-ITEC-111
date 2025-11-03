import { Controller, Post, Body, Get, Put, Delete, Param, Query, Patch } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('library')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('category')
  addCategory(@Body() dto: CreateCategoryDto) {
    return this.bookService.createCategory(dto);
  }

  @Post('book')
  addBook(@Body() dto: CreateBookDto) {
    return this.bookService.createBook(dto);
  }

  @Get('categories')
  getCategories() {
    return this.bookService.getCategories();
  }

  @Get('books')
  getBooks() {
    return this.bookService.getBooks();
  }

  @Put('category/:id')
  updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.bookService.updateCategory(id, dto);
  }

  @Delete('category/:id')
  removeCategory(@Param('id') id: number) {
    return this.bookService.removeCategory(id);
  }

  @Patch('book/:id')
  updateBook(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.updateBook(id, dto);
  }

  @Delete('book/:id')
  removeBook(@Param('id') id: number) {
    return this.bookService.removeBook(id);
  }

  @Post('books/search')
  searchBooks(@Body('title') title: string) {
    return this.bookService.searchBooksByTitle(title);
  }


  

}
