# 6. Recursive Problems 
# o Write a recursive function to reverse a string. 
# o Write a recursive function to count the number of occurrences of a target in a list.

def reverse_string(word):
    if len(word) <=1:
        return word
    return reverse_string(word[1:] )+ word[0]

print(reverse_string("ABBAY"))

def count_number(arr, target):
    if not arr:
        return 0

    if arr[0] == target:
        return 1 + count_number(arr[1:], target)
    else:
        return count_number(arr[1:], target)


print(count_number([2, 3, 2], 2))


#  by looping

def count_number2(arr,target):
    count=0
   
   
    for i in arr:
        if i == target:
            count += 1
    return count

print(count_number2([2,3,2],2))
        
        
        
        


