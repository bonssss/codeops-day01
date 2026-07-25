# 8. File Reading & Writing 
# • Create a program that: 
# o Writes 5 student names and scores to a file students.txt 
# o Reads the file back and prints average score 
# • Handle the case if file doesn’t exist.

try:
    # Writing student names and scores to a file
    with open("students.txt", "w") as file:
        students = {
            "Alice": 85,
            "Bob": 90,
            "Charlie": 78,
            "David": 92,
            "Eva": 88
        }
        for name, score in students.items():
            file.write(f"{name},{score}\n")

    # Reading the file back and calculating average score
    total_score = 0
    count = 0
    with open("students.txt", "r") as file:
        for line in file:
            name, score = line.strip().split(",")
            total_score += int(score)
            count += 1

    average_score = total_score / count if count > 0 else 0
    print(f"Average Score: {average_score:.2f}")
except FileNotFoundError:
    print("Error: File not found.")