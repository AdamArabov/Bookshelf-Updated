import { books } from "./book.js";
class Book {
 constructor(title, author, language, subject) {
     this.author = author;
     this.language = language;
     this.subject = subject;
     this.title = title;
     this.comments = [];
 }
 addComment(comment){
   this.comments.push(comment);
 }
}
// ----------------------------------------------------------------------------------------//
class Bookshelf {
 constructor() {
     this.books = [];
 }
 
 addBook(title, author, language, subject) {
     const book = new Book(title, author, language, subject);
     this.books.push(book);
 }
 
 addBooks(booksArray) {
     booksArray.forEach(book => {
         const { title, author, language, subject } = book;
         this.addBook(title, author, language, subject);
     });
 }
 
 addCommentToBook(book, comment) {
   const bookToComment =this.books.find(b => b === book);
   if (bookToComment) {
       bookToComment.addComment(comment);
 }
}
}
// ----------------------------------------------------------------------------------------//
const shelf = new Bookshelf();
function intialializeBooks(){
shelf.addBooks(books);
displayBooks();
}
 
intialializeBooks();
// ----------------------------------------------------------------------------------------//
function addBookToShelf() {
 const author = document.getElementById('author').value;
 const language = document.getElementById('language').value;
 let subject = document.getElementById('subject').value;
 if (subject === '') {
     subject = [];
 } else {
     subject = subject.split(', ');
 }
 const title = document.getElementById('title').value;
 shelf.addBook(title, author, language, subject);
 displayBooks();
}
// ----------------------------------------------------------------------------------------//
let favoriteCount = 0;

function displayBooks(filteredBooks) {
  const bookDisplay = filteredBooks || shelf.books;
  const bookList = document.getElementById ('book-list');
  bookList.innerHTML = '';
  const bookElements = bookDisplay.map(book => {
      const bookElement = document.createElement('div');
      bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Language: ${book.language}</p>
      <p>Subject: ${book.subject.join(',')}</p>
      <button id= "comment-button">Comment</button>
      <button id= "favorite-button" class= "favorite">Favorite</button>
      
      <form id="comment-form" style="display:none;">
    <textarea id="comment" maxlength="280"></textarea>
    <br>
    <span id="character-count">280</span> characters remaining
    <br>
    <button type="submit">Submit</button>
  </form>
      `;
// ----------------------------------------------------------------------------------------//
    for(const comment of book.comments) {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        bookElement.appendChild(commentElement);
    }
    const textarea = bookElement.querySelector('#comment');
    const characterCount = bookElement.querySelector('#character-count');

    textarea.addEventListener('input', () => {
      const characters = textarea.value.length;
      characterCount.innerText = 280 - characters;
      if (characters > 280) {
        characterCount.style.color = 'red';
      } else {
        characterCount.style.color = 'black';
      }
    });
      const commentButton = bookElement.querySelector('#comment-button');
      const commentForm = bookElement.querySelector('#comment-form');
      
      commentButton.addEventListener('click', () => {
        commentForm.style.display = 'block';  
      });
      
      commentForm.addEventListener('submit', event => {
        event.preventDefault();  
      
       
        const commentText = bookElement.querySelector('#comment').value;
        if(commentText.length > 280) {
            return;
        }
      
        book.comments.push(commentText);
        // commentForm.style.display = 'none';
        // bookElements.querySelector('#comment').value = '';
        displayBooks();
      });
// ----------------------------------------------------------------------------------------//    
 
const favoriteButton = bookElement.querySelector('#favorite-button');
let isFavorite = false;
favoriteButton.addEventListener('click', () => {
  isFavorite = !isFavorite;
  favoriteButton.textContent = isFavorite ? 'Unfavorite' : 'Favorite';

  const textElements = bookElement.querySelectorAll('h2,p');
  if (isFavorite) {
    textElements.forEach(element => {
      element.style.color = 'yellow';
    });
    favoriteCount++;
  } else {
    textElements.forEach(element => {
      element.style.color = '';
    });
    favoriteCount--;
  }
  document.getElementById('favorite-count').textContent =favoriteCount;
});
      return bookElement;
     
  });
  bookElements.forEach(bookElement => bookList.appendChild(bookElement));
}
 

// ----------------------------------------------------------------------------------------//

const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change',function() {
   const sortBy = this.value;
   shelf.books.sort((a,b) => {
       if (a[sortBy] < b[sortBy]) return -1;
       if (a[sortBy] > b[sortBy]) return 1;
       return 0;
   });
   displayBooks();
});

// ----------------------------------------------------------------------------------------//
const searchForm = document.getElementById('search');
searchForm.addEventListener('submit',function(event) {
   event.preventDefault();
   const searchInput = document.getElementById('search-input').value;
   const filteredBooks = shelf.books.filter(book => {
return book.title.includes(searchInput) || book.author.includes(searchInput);
   });
displayBooks(filteredBooks);
 
}); 

const addBookButton = document.getElementById('add-book-button');
addBookButton.addEventListener('click', addBookToShelf);

