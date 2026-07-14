def greet(name: str):
    print(f"welcome, {name}!")

greet("Bonsa")

def square(num: int) -> int:
    return num * num

print(f"square(5) = {square(5)}")  # Output: 25

def is_even(num: int) -> bool:
    return num % 2 == 0

print(f"is_even(5) = {is_even(5)}")  # Output: False
print(f"is_even(4) = {is_even(4)}")  # Output: True

