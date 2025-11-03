import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { decodeJwt } from './useDecoderjwt';
import { useState, useCallback, useEffect } from 'react';
import { getAllBooks, getAllCategories, searchBooks, createCategory, deleteBook, deleteCategory, createBook, updateBook } from '../service/libraryService';


export default function useHome() {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedBook, setSelectedBook] = useState<any>(null);
        const [searchQuery, setSearchQuery] = useState("");
        const [isSearching, setIsSearching] = useState(false);
        const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        description: "",
        image: "",
        categoryId: 0,
        });
        const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

        const [editBook, setEditBook] = useState<any>(null);
        const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false);

        const handleOpenEditBook = (book) => {
        // Fill edit book state properly
        setEditBook({
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description || "",
            image: book.image || "",
            categoryId: book.category?.id || ""
        });

        // CLOSE the preview/details modal
        setIsModalOpen(false);

        // OPEN the edit modal
        setIsEditBookModalOpen(true);
        };




        const handleUpdateBook = async () => {
        if (!editBook.id) return;

        const res = await updateBook(editBook.id, editBook);

        if (res.success) {
            loadBooks(); // refresh UI
            setIsEditBookModalOpen(false);
        }
        };


        const handleCreateBook = async () => {
        try {
            await createBook(newBook);
            await loadBooks(); // refresh list
            setIsAddBookModalOpen(false);
            setNewBook({ title: "", author: "", description: "", image: "", categoryId: 0 });
        } catch (error) {
            setError("Failed to create book");
        }
        };


    
        const handleBookClick = (book: any) => {
            setSelectedBook(book);
            setIsModalOpen(true);
        };
    const [books, setBooks] = useState<any[]>([]);
    // categories should be an array; initialize as empty array
    const [category, setCategory] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");


                    async function loadBooks() {
                        setIsSearching(true);
                        setError(null);
                        try {
                            let response;
                            // Search with any non-empty string
                            if (searchQuery.trim() !== '') {
                                response = await searchBooks(searchQuery.trim());
                            } else {
                                response = await getAllBooks();
                            }

                            if (!('data' in response)) {
                                setError((response as any).message || 'Failed to load books');
                                return;
                            }

                            setBooks(response.data);
                            
                            // Show message if no results found
                            if (searchQuery.trim() && response.data.length === 0) {
                                setError('No books found matching your search');
                            }
                        } catch (err) {
                            setError('Failed to load books');
                        } finally {
                            setIsSearching(false);
                        }
                    }

        async function loadCategories() {
            const response = await getAllCategories();

            if (!('data' in response)) {
                setError((response as any).message || 'Failed to load categories');
                return;
            }

            // ensure we always set an array
            setCategory(Array.isArray(response.data) ? response.data : []);
        }

        async function addCategory(newCategory: string){
            const response = await createCategory(newCategory)
            if (!('data' in response)) {
                setError((response as any).message || 'Failed to create categories');
                return;
            }
            loadCategories()
        }

        const handleDeleteBook = async (id: number) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        const res = await deleteBook(id);
        if (res.success) {
            await loadBooks(); // refresh book list
            setIsModalOpen(false); // close modal
        } else {
            setError("Failed to delete book");
        }
        };

        const handleDeleteCategory = async (id: number) => {
        if (!confirm("Delete this category? All books under it will remain but category will be removed.")) return;

        const res = await deleteCategory(id);

        if (res.success) {
            await loadCategories(); // refresh categories
        } else {
            setError("Failed to delete category");
        }


        };



        const [selected, setSelected] = useState("All books");
        const navigate = useNavigate();
        const { token, logout } = useAuth();
    
        const handleLogout = () => {
            logout();
            navigate('/');
        };
    
        const decodedToken = token ? decodeJwt(token) : null;

        // Debounce search
        useEffect(() => {
            const timer = setTimeout(() => {
                loadBooks();
            }, 300); // Wait 300ms after last keystroke

            return () => clearTimeout(timer);
        }, [searchQuery]);

        return { 
            decodedToken, 
            handleLogout, 
            selected, 
            setSelected, 
            books, 
            loadBooks, 
            error, 
            setError,
            loadCategories, 
            category,
            isModalOpen, setIsModalOpen,
            selectedBook, setSelectedBook,
            handleBookClick,
            searchQuery,
            setSearchQuery,
            isSearching,
            isAddCategoryModalOpen, setIsAddCategoryModalOpen,
            newCategoryName, setNewCategoryName,
            addCategory,
            handleDeleteBook,
            handleDeleteCategory,
            handleCreateBook,
            isAddBookModalOpen, setIsAddBookModalOpen,
            newBook, setNewBook,
            handleOpenEditBook,
            handleUpdateBook,
            isEditBookModalOpen,
            setIsEditBookModalOpen,
            editBook, setEditBook
        };
    }
