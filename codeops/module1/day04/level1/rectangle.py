# 2. Rectangle Class 
# • Create a Rectangle class with length and width. 
# o Add a method area() that returns length × width. 
# o Add a method perimeter(). 
# • Create 2 Rectangle objects and call area() & perimeter() on both.
class Rectangle:
    def __init__(self,length,width):
        self.length=length
        self.width=width

    def area(self):
        return self.length * self.width
    def perimeter(self):
        return 2 * (self.length + self.width)
    
# create objects

rectangle1=Rectangle(3,4)
rectangle2=Rectangle(5,4)

# Call area() and perimeter() for the first rectangle
print("Rectangle 1")
print("Area:", rectangle1.area())
print("Perimeter:", rectangle1.perimeter())

# Call area() and perimeter() for the second rectangle
print("\nRectangle 2")
print("Area:", rectangle2.area())
print("Perimeter:", rectangle2.perimeter())