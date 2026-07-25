# 5. Bubble Sort  
# • Implement Bubble Sort and print the array after each pass. 

def bubble_sort(arr):
    n = len(arr) 

    # Repeat for each element
    for i in range(n):  
        swapped=False

        # Compare adjacent elements
        # The last i elements are already sorted
        for j in range(0, n - i - 1):   

            # Swap if they are in the wrong order
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped=True
        print(f"pass {i +1} : {arr}")

        if not swapped:
            break

    return arr


# Example
numbers = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(numbers))

