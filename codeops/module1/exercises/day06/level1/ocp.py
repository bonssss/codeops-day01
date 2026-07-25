# 2. Open/Closed Principle (OCP)  
# • Write a function calculate_bonus(employee_type) that uses if-elif. Then refactor it 
# using classes so you can add new employee types without modifying the function.

# def calculate_bonus(empoloye_type,salary):
#     if empoloye_type == "manager":
#         return salary * 10
#     elif empoloye_type == "dev":
#         return salary * 5
#     elif empoloye_type =="qa":
#         return salary *7
#     else:
#         return salary

# print(calculate_bonus("manager",20))



#  using ocp
from abc import ABC,abstractmethod

class  Employee(ABC):
    def __init__(self,salary):
        self.salary=salary
    
    @abstractmethod
    def calculate_bonus(self):
        pass
class Manager(Employee):
    def calculate_bonus(self):
        return self.salary * 10
class Dev(Employee):
    def calculate_bonus(self):
        return self.salary * 7
class QA(Employee):

    def calculate_bonus(self):
        return self.salary * 5

class Intern(Employee):

    def calculate_bonus(self):
        return self.salary * 3

# employees =[Manager(300),
#               Dev(200),
#               QA(100),
#               Intern(50)
# ]

# for emp in employees:
#     print(
#         emp.__class__.__name__,
#         "Bonus: ",
#         emp.calculate_bonus()
#     )

manager = Manager(2000)
dev = Dev(2000)
qa = QA(2000)
intern = Intern(2000)

print("Manager Bonus:", manager.calculate_bonus())
print("Developer Bonus:", dev.calculate_bonus())
print("QA Bonus:", qa.calculate_bonus())
print("Intern Bonus:", intern.calculate_bonus())

