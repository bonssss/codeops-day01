# 4. Hashmaps (Dictionaries) Create a dictionary student_grades with 5 students. Show how 
# to: 
# o Add a new student 
# o Update a grade 
# o Check if a student exists (fast lookup)

student_grades={
    "Abel":"89",
    "A":"56",
    "B":"78",
    "C":"84",
    "D":"99"
}

# add new grade

student_grades["E"]="78"

print(student_grades)

# update value

student_grades["A"]="50"
print(student_grades)

# fast lookup
student="Abel"
if student in student_grades:
    print(f"yes found its score is {student_grades[student]}")
else:
    print("Not found")

    