# 1. Big-O Notation What is the time complexity of the following operations? 
# o Accessing an element in a Python list by index. 

# o Searching for an element in a list using in. 
# o Inserting at the beginning of a list. 
# o Dictionary lookup by key.


# accessing element has o(1) complexity

lst = [1,3,4]
print(lst[0]) 

# seaching elemet in list has o(n)
target=3
for i in lst:
    if i == target:
        print("serched value found")
        break

# inserting in tha beginneing of list has o(n) complexity b/c it shift to right

lst.insert(0,3)
print(lst)

# dict lookup key has o(1) complexity

accounts={"002":"abel","003":"hane"}

print(accounts["002"])