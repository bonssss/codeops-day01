# 2. Recursion with Lists  
# • Write a recursive function sum_list(numbers) that returns the sum of all numbers 
# in a list.

def sum_list(numbers):
    if not numbers:
        return 0
    return numbers[0] + sum_list(numbers[1:])

print(sum_list([4, 5,3,2]))
