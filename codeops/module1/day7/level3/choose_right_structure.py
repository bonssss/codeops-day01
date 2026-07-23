"""
10. Choose the Right Data Structure

For each scenario, recommend the best data structure
and justify the choice using Big-O notation.
"""

from collections import deque

# ----------------------------------------------------
# 1. Checking if a username is already taken
# Best Data Structure: Set
# Reason:
# - Usernames are unique.
# - Checking membership in a set is O(1) on average.
# ----------------------------------------------------

print("1. Username Availability Check")

usernames = {"alice", "bob", "charlie"}

username = "alice"

if username in usernames:
    print(f"'{username}' is already taken.")
else:
    print(f"'{username}' is available.")

print("-" * 50)


# ----------------------------------------------------
# 2. Processing tasks in the order they arrive
# Best Data Structure: Queue (collections.deque)
# Reason:
# - A queue follows FIFO (First In, First Out).
# - append() = O(1)
# - popleft() = O(1)
# ----------------------------------------------------

print("2. Customer Support Queue")

tasks = deque()

tasks.append("Customer A")
tasks.append("Customer B")
tasks.append("Customer C")

print("Processing:", tasks.popleft())
print("Processing:", tasks.popleft())
print("Remaining Queue:", list(tasks))

print("-" * 50)


# ----------------------------------------------------
# 3. Implementing an Undo feature
# Best Data Structure: Stack (Python List)
# Reason:
# - Undo uses LIFO (Last In, First Out).
# - append() = O(1)
# - pop() = O(1)
# ----------------------------------------------------

print("3. Undo Feature")

undo_stack = []

undo_stack.append("Typed Hello")
undo_stack.append("Typed World")
undo_stack.append("Deleted Word")

print("Undo:", undo_stack.pop())
print("Undo:", undo_stack.pop())

print("Current Stack:", undo_stack)

print("-" * 50)


# ----------------------------------------------------
# 4. Storing student IDs for fast lookup
# Best Data Structure: Set
# Reason:
# - Student IDs are unique.
# - Membership testing is O(1) on average.
# ----------------------------------------------------

print("4. Student ID Lookup")

student_ids = {101, 102, 103, 104}

student = 103

if student in student_ids:
    print(f"Student ID {student} found.")
else:
    print(f"Student ID {student} not found.")

print("-" * 50)


# ----------------------------------------------------
# Summary
# ----------------------------------------------------

print("Summary")
print("=" * 50)

print("1. Username Check")
print("   Data Structure : Set")
print("   Big-O          : O(1) average lookup\n")

print("2. Customer Support Tasks")
print("   Data Structure : Queue (deque)")
print("   Big-O          : Enqueue O(1), Dequeue O(1)\n")

print("3. Undo Feature")
print("   Data Structure : Stack (List)")
print("   Big-O          : Push O(1), Pop O(1)\n")

print("4. Student ID Lookup")
print("   Data Structure : Set")
print("   Big-O          : O(1) average lookup")