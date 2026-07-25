# 3. Linear Search  
# • Implement a function linear_search(arr, target) that returns the index of the target 
# or -1 if not found. 

def linear_search(arr,target):
    for i in arr:
        if i == target:
            return arr.index(i)
    return -1

print(linear_search([2,4,6,7],7))

def linear_search2(arr,target):
    for index,value in enumerate(arr):
        if value == target:
            return index
    return -1

print(linear_search2([2,4,6,7],2))
