import useHome from "../../hooks/useHome";
import "../../style/app.css";
import Navbar from "../../component/navbar/navbar";
import ChipsRadio from "../../component/chips/chips";
import { useEffect, useState } from "react";
import BookCard from "../../component/card/BookCard";
import Modal from "../../component/modal/Modal";
import TextInput from "../../component/input/TextInput";




export default function Home() {
    const { 
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
        isAddCategoryModalOpen, 
        setIsAddCategoryModalOpen,
        newCategoryName, 
        setNewCategoryName,
        addCategory,
        handleDeleteBook,
        handleDeleteCategory,
        isAddBookModalOpen, setIsAddBookModalOpen,
        newBook, setNewBook,
        handleCreateBook,
        handleOpenEditBook,
        handleUpdateBook,
        isEditBookModalOpen,
        setIsEditBookModalOpen,
        editBook, setEditBook

    } = useHome();



    useEffect(() => {
        loadBooks();
        loadCategories();
    }, []);

    return (
        <>
        <div className="Appcontainer">
            <Navbar token={decodedToken} logout={handleLogout} />

            <div style={{ 
                background: "#333", 
                padding: "20px",
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>
                <div style={{ 
                    display: 'flex', 
                    gap: '20px',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search books..."
                            inputLabel="Search"
                        />
                        <button
                            onClick={() => setIsAddBookModalOpen(true)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                width: '100%'
                            }}
                            >
                            Add Book
                            </button>
                    </div>
                    {isSearching && <span style={{ color: '#888' }}>Searching...</span>}
                    
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <ChipsRadio
                        name="genres"
                        options={[
                            "All books",
                            ...(Array.isArray(category) ? category.map((cat: any) => cat.name) : []),
                        ]}
                        selected={selected}
                        onChange={setSelected}
                    />
                    {selected !== "All books" && (
                        <button
                            onClick={() => {
                            const cat = category.find((c: any) => c.name === selected);
                            handleDeleteCategory(cat.id);
                            }}
                            style={{
                            padding: "8px 16px",
                            backgroundColor: "#e63946",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px"
                            }}
                        >
                            Delete Category
                        </button>
                    )}

                    <button 
                        onClick={() => setIsAddCategoryModalOpen(true)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Add Category
                    </button>
                </div>
            </div>
            <h1 style={{padding: "10px", margin: 0}}>{selected}</h1>
            <div style={{
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "24px",
                alignItems: "stretch"
            }}>
                {books
                    .filter((book: any) =>
                        selected === "All books" || (book.category && book.category.name === selected)
                    )
                    .map((book: any) => (
                        <BookCard
                            key={book.id}
                            title={book.title || "Untitled"}
                            author={book.author || "Unknown Author"}
                            image={book.image}
                            onClick={() => handleBookClick(book)}
                        />
                    ))}
            </div>

            </div>

            <Modal
                isOpen={isEditBookModalOpen}
                onClose={() => setIsEditBookModalOpen(false)}
                title="Edit Book"
            >
                <div style={{ padding: "20px" }}>
                    <TextInput
                        value={editBook?.title || ""}
                        onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                        inputLabel="Title"
                    />

                    <TextInput
                        value={editBook?.author || ""}
                        onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                        inputLabel="Author"
                    />

                    <TextInput
                        value={editBook?.description || ""}
                        onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                        inputLabel="Description"
                    />

                    <select
                        value={editBook?.categoryId || ""}
                        onChange={(e) => setEditBook({ ...editBook, categoryId: Number(e.target.value) })}
                        style={{ width: "100%", padding: "8px", borderRadius: "6px", marginTop: "12px" }}
                    >
                        <option value="">Select Category</option>
                        {category.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <button
                        style={{
                            marginTop: "20px",
                            width: "100%",
                            padding: "10px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "6px"
                        }}
                        onClick={handleUpdateBook}
                    >
                        Save Changes
                    </button>

                    <button
                        style={{
                            marginTop: "8px",
                            width: "100%",
                            padding: "10px",
                            background: "#9E9E9E",
                            color: "white",
                            border: "none",
                            borderRadius: "6px"
                        }}
                        onClick={() => setIsEditBookModalOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>




            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedBook?.title || "Book Details"}
            >
                {selectedBook && (
                    <div className="book-detail">
                        <div className="book-detail-image">
                        <img
                            src={selectedBook.image || "../../assets/book-placeholder.svg"}
                            alt={selectedBook.title}
                        />
                        </div>
                        <div className="book-detail-info">
                        <h1>{selectedBook.title}</h1>
                        <p className="author">by {selectedBook.author}</p>
                        <p className="description">{selectedBook.description || "No description available."}</p>

                        {selectedBook.category && (
                            <span className="category">{selectedBook.category.name}</span>
                        )}

                        <div>

                            <button
                                style={{
                                marginTop: "20px",
                                marginRight: "10px",
                                padding: "10px 16px",
                                backgroundColor: "#e63946",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold"
                                }}
                                onClick={() => handleDeleteBook(selectedBook.id)}
                            >
                            Delete Book
                        </button>
                        <button
                            style={{
                                padding: "10px 16px",
                                background: "#2196F3",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                            onClick={() => handleOpenEditBook(selectedBook)}
                            >
                            Edit
                            </button>


                        </div>

                        </div>
                    </div>
                    )}

            </Modal>

            <Modal
                isOpen={isAddCategoryModalOpen}
                onClose={() => {
                    setIsAddCategoryModalOpen(false);
                    setNewCategoryName("");
                }}
                title="Add New Category"
            >
                <div style={{ padding: '20px' }}>
                    <TextInput
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        inputLabel="Category Name"
                    />
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                            onClick={() => {
                                setIsAddCategoryModalOpen(false);
                                setNewCategoryName("");
                            }}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#666',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    // TODO: Implement category creation API call
                                    setIsAddCategoryModalOpen(false);
                                    setNewCategoryName("");
                                    addCategory(newCategoryName)
                                    await loadCategories(); // Refresh categories after adding
                                } catch (err) {
                                    setError("Failed to add category");
                                }
                            }}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Add Category
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isAddBookModalOpen}
                onClose={() => setIsAddBookModalOpen(false)}
                title="Add Book"
                >
                <div style={{ padding: "20px" }}>

                    <TextInput
                    inputLabel="Title"
                    placeholder="Enter book title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />

                    <TextInput
                    inputLabel="Author"
                    placeholder="Enter author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />

                    <TextInput
                    inputLabel="Description"
                    placeholder="Enter description"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    />

                    <select
                    value={newBook.categoryId}
                    onChange={(e) => setNewBook({ ...newBook, categoryId: Number(e.target.value) })}
                    style={{ padding: "8px", borderRadius: "4px", width: "100%", marginTop: "15px" }}
                    >
                    <option value="">Select Category</option>
                    {category.map((c: any) => (
                        <option key={c.id} value={c.id}>
                        {c.name}
                        </option>
                    ))}
                    </select>

                    <button
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "10px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                    onClick={handleCreateBook}
                    disabled={!newBook.title || !newBook.author}
                    >
                    Add Book
                    </button>


                </div>
                </Modal>
                

        </>
    );
}