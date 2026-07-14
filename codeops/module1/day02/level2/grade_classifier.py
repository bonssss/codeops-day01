# simple grade classifier base of score 

score = int(input("Enter your score: "))
if score >= 90:
    print("Excellent keep it up!!.")
elif score >= 80:
    print(" very Good Great job! You are doing well.")
elif score >= 70:
    print("Good effort! Keep working hard.")
elif score >=50:
    print("You passed! Keep improving.")
else:
    print("You failed. Better luck next time.")