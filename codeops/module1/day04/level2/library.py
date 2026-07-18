# 8. Library System 
# • Create a Book class (title, author, isbn, available) 
# • Create a Library class that holds a list of Book objects 
# • Add methods: 
# o add_book(book) 
# o borrow_book(isbn) 
# o return_book(isbn) 
# • Use encapsulation properly. 
# • Create a Book object and test add, borrow & return methods.

class Book:
    def __init__(self,title,author,isbn):
        self.title=title
        self.author=author
        self.isbn=isbn
        self.__available=True
    @property
    def available(self):
        return self.__available
    
    @available.setter
    def available(self,status):
        self.__available=status

class Library:
    def __init__(self):
        self.books=[]

    def add_book(self,book):
        self.books.append(book)
        print("success fully added")

    def borrow_book(self,isbn):
        for book in self.books:
            if book.isbn == isbn:
                if book.available:
                    book.available=False
                    print(f"{book.title} borrowed successfully")
                else:
                    print("Book is already borrowed")
                return
        print("Book not found")

    def return_book(self,isbn):
        for book in self.books:
            if book.isbn == isbn:
                if not book.available:
                    book.available=True
                    print(f"{book.title} returned")
                else:
                    print("Book is already in library")
                return
        print("Book not found")

book1 = Book("Python Basics", "John Smith", "101")
book2 = Book("Data Structures", "Alice Brown", "102")

library = Library()

library.add_book(book1)
library.add_book(book2)

library.borrow_book("101")
library.borrow_book("101")

library.return_book("101")
library.return_book("101")
        


    