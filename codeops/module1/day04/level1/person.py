class Person:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def introduce(self):
        print(f"Hello, {self.name}. You are {self.age} years old.")
intro = Person("bon",25)
intro.introduce()