# 7. Sorting Comparison  
# o Implement Selection Sort and Insertion Sort (take the provided code).  
# o Test them on the same list and note how many swaps/comparisons each makes. 


def selection_sort(arr):
    comparisons = 0
    swaps = 0
    n = len(arr)

    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if arr[j] < arr[min_index]:
                min_index = j

        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
            swaps += 1

    return arr, comparisons, swaps


def insertion_sort(arr):
    comparisons = 0
    moves = 0

    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while True:
            comparisons += 1
            if j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                moves += 1
                j -= 1
                continue
            break

        arr[j + 1] = key
        moves += 1

    return arr, comparisons, moves


if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]

    s_list = numbers.copy()
    i_list = numbers.copy()

    s_sorted, s_comp, s_swaps = selection_sort(s_list)
    i_sorted, i_comp, i_moves = insertion_sort(i_list)

    print("Original:", numbers)
    print(f"Selection Sort -> sorted: {s_sorted}, comparisons: {s_comp}, swaps: {s_swaps}")
    print(f"Insertion Sort -> sorted: {i_sorted}, comparisons: {i_comp}, moves: {i_moves}")