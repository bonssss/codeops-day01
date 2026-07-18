# 5. Product Class 
# • Create a Product class with name, price, and stock. 
# • Add method sell(quantity) that reduces stock (prevent going negative). 
# • Add method restock(quantity). 
# • Create a product object and test sell and restock.

class Product:
    def __init__(self,name,price,stock):

        self.name=name
        self.price=price
        self.stock=stock
    def sell(self,quantity):
        if quantity > self.stock:
            print("Insufficient stock")
        else:
            self.stock -= quantity
    def restock(self,quantity):
         self.stock +=quantity
    
pro= Product("pen",20,25)
pro.sell(10)
print(pro.name)
print(pro.price)
print(pro.stock)

pro.restock(100)
print(pro.stock)