# 6. List Comprehension 
# • Create a list of numbers from 1 to 20 using comprehension. 
# • Create a new list containing only even numbers from 1 to 30 using comprehension. 
# • Create a list of odd numbers from 1 to 10 using comprehension
numbers_1_to_20 = [i for i in range(1, 21)]
even_numbers_1_to_30 = [i for i in range(1, 31) if i % 2 == 0]
odd_numbers_1_to_10 = [i for i in range(1, 11) if i % 2 != 0]
print("Numbers from 1 to 20:", numbers_1_to_20)
print("Even numbers from 1 to 30:", even_numbers_1_to_30)
print("Odd numbers from 1 to 10:", odd_numbers_1_to_10)