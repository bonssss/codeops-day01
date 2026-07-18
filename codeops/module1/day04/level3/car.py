# 9. Car Class with Encapsulation 
# • Create a Car class with private attributes: __speed, __fuel 
# • Methods: accelerate(), brake(), refuel() 
# • Use @property for speed and fuel 
# • Create a Car object and test accelerate,brak & refuel methods.

class Car:
    def __init__(self,speed,fuel):
        self.__speed=speed
        self.__fuel=fuel
    @property
    def speed(self):
        return self.__speed
    @property
    def fuel(self):
        return self.__fuel
    
    def accelerate(self):
        if self.__fuel > 0:
            self.__speed += 10
            self.__fuel -= 5
        else:
            print("no fuel")
    def brake(self):
        if self.__speed >= 10:

            self.__speed -= 10
        else:
            self.__speed=0

    def refuel(self,amount):
        if amount <= 0:
            print("amount must be positive")
        else:
            self.__fuel += amount
    
    
car= Car(100,0)
car.accelerate()
print("speed:",car.speed)

car.brake()
print("speed:",car.speed)
print("fuel: ",car.fuel)


car.refuel(100)
print("speed: ",car.speed)
print("fuel: ",car.fuel)

