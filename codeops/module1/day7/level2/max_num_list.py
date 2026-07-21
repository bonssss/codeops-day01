# 5. Big-O Analysis  
# o Write a function that finds the maximum number in a list. What is its time 
# complexity? Then write a function with two nested loops and analyze its 
# complexity.

def max_number(lst):
    return max(lst)

# its compexity is o(n)
print(max_number([3,4,2,7]))

# using nested loops its time complexity is o(n2)

lst=[23,3,4,5,67,7]
max_num=lst[0]
for i in lst:
    for j in lst:
        if i > max_num:
            max_num=i
print(f"max number is {max_num}")
            
     

            
    
        
            
