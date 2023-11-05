//helper function
const limitResults = (results) => {
  return results.slice(0, 5);
}

const getTotalBooksCount = (books) => {
  //reduce accumulates values, zero is my initial value, count is my accumulator
  return books.reduce((count, book) => count + 1, 0 )
}

const getTotalAccountsCount = (accounts) => {
  return accounts.reduce((count, account) => count + 1, 0)
}


  //return number (count) of books borrowed
  //books > borrows array > returned boolean
 const getBooksBorrowedCount = (books) => {
  const borrowedBooks = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.returned === false);
  });
  return getTotalBooksCount(borrowedBooks);
};


 const getMostCommonGenres = (books) => {
  // Count the occurrence of each genre using reduce
  const genreCounts = books.reduce((count, book) => {
    const genre = book.genre; // Assuming genre is a single string, not an array
    count[genre] = (count[genre] || 0) + 1;
    return count;
  }, {});

  // Convert genreCounts object to an array of objects for easier sorting
  const genresArray = Object.entries(genreCounts).map(([genre, count]) => ({
    name: genre,
    count: count
  }));

  // Sort the genresArray based on count in descending order
  genresArray.sort((a, b) => b.count - a.count);


  return limitResults(genresArray);
}



const getMostPopularBooks = (books) => {
  // Count the number of borrows for each book
  //using map because we want to extract a property and count it, and return a new object
  const bookCounts = books.map(book => {
    const { title, borrows } = book;
    return {
      name: title,
      count: borrows.length
    };
  });

  // Sort the books based on borrow count in descending order
  bookCounts.sort((a, b) => b.count - a.count);

  return limitResults(bookCounts)
};


function getMostPopularAuthors(books, authors) {
  //find books written by the author
  //add the number of times those books were borrowed 

  // Iterate through books object to count where author ID matches ID
  const borrowCount = books.reduce((count, book) => {
  const author = authors.find(author => author.id === book.authorId);
  const authorName = `${author.name.first} ${author.name.last}`;
    count[authorName] = (count[authorName] || 0) + book.borrows.length;
    return count;
  }, {});

  //Convert Object to an Array
  const authorArray = Object.entries(borrowCount).map(([name, count]) => ({
    name: name,
    count: count
  }));

  // sort
  authorArray.sort((a, b) => b.count - a.count);


  return limitResults(authorArray);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
