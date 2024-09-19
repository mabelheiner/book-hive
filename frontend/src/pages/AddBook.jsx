import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams } from 'react-router-dom';

function AddBook(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);

  // Initialize books as an empty array
  const [books, setBooks] = useState([]);

  console.log('User passed', useParams())

  const addBook = async (e) => {
    e.preventDefault();
    try {
      console.log('http://localhost:5000/books', { title, author, isbn, image, rating });
      const response = await axios.post('http://localhost:5000/books', { title, author, isbn, image, rating });
      console.log('Response', response.data);

      // Correctly update the books state
      setBooks([...books, response.data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  async function deleteBook(id) {
    const response = await axios.delete(`http://localhost:5000/books/${id}`)
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch data from the server and set the books state
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
        console.log('Books grabbed', response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBooks();
  }, []);

  function logout() {
    window.location.href = '/'
  }

  return (
    <div className="App">
      <form className='book-form' onSubmit={addBook}>
        <label htmlFor="title">Enter title:</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="author">Enter author:</label>
        <input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label htmlFor="isbn">Enter the ISBN:</label>
        <input type="text" name="isbn" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

        <label htmlFor="image">Enter the image link:</label>
        <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} />

        <label htmlFor="rating">Enter the rating:</label>
        <input type="number" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

        <button type="submit">Add Book!</button>
      </form>

      <ul>
        {books.map((book) => (
          <div className='book-display'>
            <li key={book._id}>{book.title} by {book.author}</li>
            <button onClick={() => deleteBook(book._id)}>Delete book</button>
          </div>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AddBook;