# 8. Two Pointer Technique
# o Given a sorted array, write a function to find two numbers that add up to a target.

def two_sum_two_pointer(arr, target):
	"""Return a tuple of two values from the sorted list `arr` that sum to `target`.
	If no such pair exists, return None.
	"""
	left = 0
	right = len(arr) - 1

	while left < right:
		s = arr[left] + arr[right]
		if s == target:
			return arr[left], arr[right]
		if s < target:
			left += 1
		else:
			right -= 1

	return None


if __name__ == "__main__":
	# sample tests
	tests = [
		([1, 2, 3, 4, 6], 6),    # 2+4 or 1+5(not present)
		([2, 3, 4, 5, 9], 11),   # 2+9
		([1, 1, 2, 3], 2),       # 1+1
		([1, 2, 3, 4], 8),       # no pair
	]

	for arr, target in tests:
		result = two_sum_two_pointer(arr, target)
		print(f"arr={arr}, target={target} -> {result}")