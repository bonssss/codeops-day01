from abc import ABC
class employee(ABC):
    def __init__(self, empId, name, salary):
        self.emp = empId
        self.name = name
        self.__sal = salary

    @property
    def salary(self) :
        return self.__sal
    
    @salary.setter
    def salary(self, salary) :
        if salary <= 0:
            print("salary cannt be zero")
        self.__sal = salary

    def display(self) :
        print(f"employee id: {self.emp}") 
        print(f"employe name: {self.name}")
        print(f"employee salary: {self.__sal}")
    
    def calculate_salary(self):
        ...

class ftemployee(employee):
    def __init(self, empId, name, salary):
        super().__init__(empId, name, salary)

    def calculate_salary(self):
        pass
           

class ptemployee(employee):
     def __init__(self, emId, name, salary, hours):
        super.__init__(emId, name, salary) 
        self.hours = hours

     def calculate_salary(self):
         return self.__sal * self.hours

abe = ftemployee("xyz0102", "abebe", 10000)
abe.display()
# alemu = ptemployee("xyz0104", "alemu", 2000, 40)
# alemu.display()