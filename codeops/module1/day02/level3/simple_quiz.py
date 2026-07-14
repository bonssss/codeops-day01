#  Make a 5-question quiz (about Ethiopia or general knowledge). 
#  Keep score. 
#  At the end, show final score and message based on performance (use functions).

def ask_question(question, correct_answer):
    answer = input(question + " ")
    if answer.lower() == correct_answer.lower():
        print("Correct!")
        return 1
    else:
        print(f"Wrong! The correct answer is: {correct_answer}")
        return 0

def main():
    score = 0
    questions = [
        ("What is the capital of Ethiopia?", "Addis Ababa"),
        ("What is the largest lake in Ethiopia?", "Lake Tana"),
        ("In which year did Ethiopia gain independence?", "1941"),
        ("What is the official language of Ethiopia?", "Amharic"),
        ("Who is the current Prime Minister of Ethiopia?", "Abiy Ahmed")
    ]

    for question, correct_answer in questions:
        score += ask_question(question, correct_answer)

    print(f"Final Score: {score}/5")
    if score == 5:
        print("Excellent! You are a true expert.")
    elif score >= 3:
        print("Good job! You know your stuff.")
    else:
        print("Keep learning! You can do better.")

if __name__ == "__main__":
    main()
