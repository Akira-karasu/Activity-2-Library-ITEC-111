// src/services/libraryService.js
import api from "../api/api";
import { handleError } from "./errorHandler";

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  image?: string;
  categoryId: number;
}


export const getAllBooks = async () => {
  try {
    const res = await api.get("/library/books");
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await api.get("/library/categories");
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createBook = async (data: Book) => {
  try {
    const res = await api.post("/library/book", data);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createCategory = async (name: string) => {
  try {
    const res = await api.post("/library/category", { name });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await api.delete(`/library/category/${id}`);
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
};

export const updateBook = async (id: number, data: any) => {
  try {
    const res = await api.patch(`/library/book/${id}`, data);
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBook = async (id: number) => {
  try {
    await api.delete(`/library/book/${id}`);
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
};

export const searchBooks = async (title: string) => {
  try {
    const res = await api.post("/library/books/search", {
      title: title,
    });
    return { success: true, data: res.data };
  } catch (error) {
    return handleError(error);
  }
};