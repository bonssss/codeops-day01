# 3. Liskov Substitution Principle (LSP)  
# • Create Bird and Penguin classes. Fix the design so that a function 
# make_bird_fly(bird) works properly with both (without errors).

from abc import ABC,abstractmethod

class Bird(ABC):

    @abstractmethod
    def move(self):
        pass
class ISFly(Bird):
    
    def move(self):
        print("Flying")

class Penguin(Bird):
   
    def move(self):
        print("can't fly")


def make_bird_move(bird):
    bird.move()

sparrow = ISFly()
penguin= Penguin()

make_bird_move(sparrow)
make_bird_move(penguin)