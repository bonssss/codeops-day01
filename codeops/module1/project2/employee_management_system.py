from abc import abstractmethod,ABC

class Employee(ABC):
    def __init__(self,emp_id,name,salary,department):
        self.emp_id =emp_id
        self.name=name
        self.__salary=salary
        self.department=department

    @property
    def salary(self):
        return self.__salary

    @salary.setter
    def salary(self,salary):
        if salary <= 0:
            print("Salary shoud be positive")
        self.__salary=salary
    def display(self):
        print(f"employee_id: {self.emp_id}")
        print(f"employee name: {self.name}")
        print(f"employee salary: {self.salary}")
        print (f"employee departemnt : {self.department}")
    @abstractmethod
    def calculate_salary(self):
        ...




class FTEmployee(Employee):
    def __init__(self, emp_id, name, salary,department,bonus):
        super().__init__(emp_id, name, salary,department)
        self.bonus=bonus
    def calculate_salary(self):
        return self.salary + self.bonus





class PTEmployee(Employee):
    def __init__(self, emp_id, name, salary,department,hours):
        super().__init__(emp_id, name, salary,department)
        self.hours = hours

    def calculate_salary(self):
        return self.salary * self.hours


# full time employee
emp1 = FTEmployee(1,"joo",200,"Manager",20)

emp1.display()
print(emp1.bonus)
print(f"Total_salary : {emp1.calculate_salary()}")

print("**************************************")

# partime emeployee
emp2 = PTEmployee(2,"noo",300,"Developer",2)
emp2.display()
print(f"Total_salary : {emp2.calculate_salary()}")



    


