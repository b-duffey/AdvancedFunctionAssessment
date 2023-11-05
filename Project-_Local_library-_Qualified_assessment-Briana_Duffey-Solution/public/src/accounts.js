const findAccountById = (accounts, id) => {
  return accounts.find(account => account.id === id);
}; //use find to return an object

//return a sorted array of account objects. Sort alphabetically by last name
const sortAccountsByLastName = (accounts) => {
  //sort is passes a comparison function
  return accounts.sort((a, b) => {
  const lastNameA = a.name.last.toLowerCase(); //makes this case-insensitive
  const lastNameB = b.name.last.toLowerCase();

  if (lastNameA < lastNameB) {
    return -1; //sort by ascending order
  }
  if (lastNameA > lastNameB) {
    return 1;
  }
  return 0;
});
}

const getTotalNumberOfBorrows = (account, books) => {
  //totalBorrows is used to store the value of the total number of borrows, it is the accumulator
  return books.reduce((totalBorrows, book) => {
    //count is the accumulator, used to keep track of account ids in borrows property
    const borrowCount = book.borrows.reduce((count, borrow) => {
      // Check if the account ID matches the borrower ID in the book's borrow array
      if (borrow.id === account.id) {
        return count + 1;
      }
      return count;
    }, 0); // Initialize the count to 0 for each book's borrow array
    return totalBorrows + borrowCount;
  }, 0); // Initialize the total count to 0
};0



function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter(book => {
      const borrowRecord = book.borrows.find(borrow => borrow.id === account.id && !borrow.returned);
      return borrowRecord;
    })
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return {
        ...book,
        author,
      };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
