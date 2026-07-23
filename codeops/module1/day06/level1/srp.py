# 1. Single Responsibility Principle (SRP)  
# • Create a class called Employee that currently handles salary calculation, saving to 
# file, and sending email. Refactor it into separate classes following SRP.

class Employee:
    def __init__(self,name,salary):
        self.salary=salary
        self.name=name
class SalaryCalculator:
    def calculate_salary(slef,employee):
        return employee.salary
class FileManager:
    def save_to_file(self,employee):
        with open("employees.txt","w" ) as file:
            file.write(f"{employee.name} , {employee.salary} \n")
        print("Employee saved successfully")
               
class EmailService:
    def send_email(self,employee):
        print(f"email sent to {employee.name}.")
    
emp= Employee("hoo",1200)
salary=SalaryCalculator()
print("Salary: ", salary.calculate_salary(emp))

file_manager= FileManager()
file_manager.save_to_file(emp)

email=EmailService()
email.send_email(emp)