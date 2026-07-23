# 1. Recursion Basics  
# • Write a recursive function factorial(n) that returns the factorial of a number. Also 
# write the iterative version for comparison.

def factorial(n):
    if n <=1 :
        return 1
    else:
        return n * factorial(n-1)
    
        

print(factorial(4))


# iteration

def fact_iterative(n):
    fact=1

    for i in range(1,n+1):
        fact *= i


    return fact

print(fact_iterative(5))


    
        
    