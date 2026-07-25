# 4. Student Class 
# • Create a Student class with: 
# o name, student_id, and a list of grades 
# o Method add_grade(grade) 
# o Method average_grade() (use a loop or sum/len) 
# • Create a student object, add several grades, and print the average. 

class Student:
    total=0
    def __init__(self,name,student_id,grades):
    
        self.name=name
        self.student_id=student_id
        self.grades=grades

    def add_grade(self,grade):
        self.grades.append(grade)
        

    def average_grade(self):
        return sum(self.grades)/len(self.grades)
stud = Student("Bob", 12, [40, 50])

stud.add_grade(60)
stud.add_grade(70)

print("Grades:", stud.grades)
print("Average:", stud.average_grade())