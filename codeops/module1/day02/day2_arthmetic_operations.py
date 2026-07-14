number_1= int(input("Enter the first number: "))
number_2= int(input("Enter the second number: "))

# addition of 2 numbers
sum= number_1 + number_2
print(f"The sum of {number_1} and {number_2} is: {sum}")

# subtraction of 2 numbers
difference= number_1 - number_2
print(f"The difference of {number_1} and {number_2} is: {difference}")

# multiplication of 2 numbers
product= number_1 * number_2
print(f"The product of {number_1} and {number_2} is: {product}")

# division of 2 numbers
if number_2 != 0:
    quotient= number_1 / number_2
    print(f"The quotient of {number_1} and {number_2} is: {quotient}")
elif number_2 == 0:
    print("Division by zero is not allowed.")
elif number_1 == 0:
    print("The first number is zero, the quotient will be zero.")

# modulus of 2 numbers
if number_2 != 0:
    remainder= number_1 % number_2
    print(f"The remainder of {number_1} divided by {number_2} is: {remainder}")
elif number_2 == 0:
    print("Modulus by zero is not allowed.")

# floor division

if number_2 != 0:
    floor_division= number_1 // number_2
    print(f"The floor division of {number_1} and {number_2} is: {floor_division}")
elif number_2 == 0:
    print("Floor division by zero is not allowed.")


