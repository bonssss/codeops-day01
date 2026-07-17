# error handling

try:
    number1 = int(input("Enter a number: "))
    number2 = int(input("Enter another number: "))
    result = number1 / number2
    print(f"Result: {result}")
except ValueError:
    print("Error: Please enter valid numbers.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
finally:
     print("Calculation attempt completed.")