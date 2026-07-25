# Level 1: Basic 
# 1. Simple Inheritance 
# • Create a Vehicle parent class with: 
# o name, model, year 
# o info() method 
# • Create Car and Motorcycle child classes that inherit from Vehicle. 
# • Add one unique attribute and method to each child.

class Vehicle:
    def __init__(self,name,model,year):
        self.name=name
        self.model=model
        self.year=year
    def info(self):
         print(f"{self.name} {self.model} ({self.year})")

class Car(Vehicle):
    def __init__(self, name, model, year,country):
        super().__init__(name, model, year)
        self.country=country
    def carmethod(self):
        print(f"This car made in {self.country}")
class Motorcycle(Vehicle):
    def __init__(self, name, model, year,price):
        super().__init__(name, model, year)
        self.price=price
    def motormethod(self):
        print(f"Its price is {self.price}")

car = Car("BYD", "Seal", 2024, "China")
bike = Motorcycle("Yamaha", "R15", 2023, 155)
car.info()
car.carmethod()

bike.info()
bike.motormethod()

