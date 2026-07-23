# 9. Performance Comparison Write code to compare the time taken to: 
# o Search in a list vs search in a dictionary (use time module). 
# o Insert 10,000 elements at the beginning of a list vs using “collections.deque”

import time
from collections import deque

# -----------------------------
# 1. Search in List vs Dictionary
# -----------------------------

# Create data
lst = list(range(1_000_000))
dct = {i: i for i in range(1_000_000)}

target = 999_999

# Search in list
start = time.time()
found = target in lst
end = time.time()

print(f"List search took: {end - start:.8f} seconds")

# Search in dictionary
start = time.time()
found = target in dct
end = time.time()

print(f"Dictionary search took: {end - start:.8f} seconds")


# -----------------------------------------------
# 2. Insert 10,000 elements at beginning
#    List vs Deque
# -----------------------------------------------

# Using list
lst = []
start = time.time()

for i in range(10000):
    lst.insert(0, i)

end = time.time()

print(f"List insert at beginning took: {end - start:.8f} seconds")
# print(lst)


# Using deque
dq = deque()
start = time.time()

for i in range(10_000):
    dq.appendleft(i)

end = time.time()

print(f"Deque appendleft took: {end - start:.8f} seconds")