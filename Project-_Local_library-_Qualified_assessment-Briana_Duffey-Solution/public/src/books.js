const findAuthorById = (authors, id) => {
  return authors.find( author => author.id === id);
//find is for objects

};

const findBookById = (books, id) => {
  return books.find( book => book.id === id);
  
};

const partitionBooksByBorrowedStatus = (books) => {
  //return an array with two arrays nested
  
  //first array contains book objects that are checked out
  
  //second array contains book objects that are returns
  
  //check return status in borrows array of book object

const borrowed = books.filter(book => !book.borrows[0].returned); //iterate through the borrows array, if it was an object I could do book.borrows.returned
  
const returned = books.filter(book => book.borrows[0].returned);

let borrowStatus = [];
borrowStatus[0] = borrowed;
borrowStatus[1] = returned;

return borrowStatus;
  
  //can structure an array with array[element, element] 

}

const getBorrowersForBook = (book, accounts) => {
  
  //map is used here to transform the borrow array based on the account id
const borrowRecords = book.borrows.map(borrow => {
  
const account = accounts.find(acc => acc.id === borrow.id);
    return {
      ...borrow, //spread operator used to merge properties from both objects into a new object.
      ...account,
    };
  });

  // Limit the result to 10 objects
  return borrowRecords.slice(0, 10);
};
   
 



 

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
