#  List Operations 
# • Create a list of numbers: [10, 25, 40, 15, 60, 30] 
# • Use a loop to print only numbers greater than 30. 
# • Sort the list and print it. 
# • Find the sum and average of the list. 

numbers = [10, 25, 40, 15, 60, 30]
# Print numbers greater than 30
for num in numbers:
    if num > 30:
        print(num)

# Sort the list and print it
numbers.sort()
print(numbers)

# Find the sum and average of the list
total = sum(numbers)
average = total / len(numbers)
print(f"Sum: {total}, Average: {average}")