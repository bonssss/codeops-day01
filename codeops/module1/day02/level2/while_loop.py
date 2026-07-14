
#  ask user to  enter positive number then add them till users insert 0

number= int(input("Enter a positive number (or 0 to stop): "))
total = 0
while True:
    total += number
    number = int(input("Enter a positive number (or 0 to stop): "))
    if number == 0:
        break
print(f"The sum of the entered numbers is: {total}")