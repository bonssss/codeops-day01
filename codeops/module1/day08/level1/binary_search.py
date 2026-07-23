# 4. Binary Search  
# • Implement binary_search(arr, target). Explain why it needs a sorted array. 

def binary_search(arr,target):
    low,high =0,len(arr)-1

    while low <=high:
        mid = (low + high)//2
        if arr[mid]==target:
            return mid
        elif arr[mid] < target:
            low= mid +1
        else:
            high = mid -1
    return -1


print(binary_search([2,3,4,5],5))


# Why does Binary Search need a sorted array?

# Binary search works by checking the middle element.

# If the middle value is smaller than the target, it searches only the right half.
# If the middle value is larger than the target, it searches only the left half.

# This logic only works if the array is sorted.



