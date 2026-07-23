"""
11. Linked List vs Array (Python List)

Implement a function to remove the middle element from:
1. A Python list (array)
2. A Singly Linked List

Discuss the trade-offs using Big-O notation.
"""


# =====================================================
# Remove Middle Element from a Python List
# =====================================================

def remove_middle_list(arr):
    """Removes the middle element from a Python list."""

    if not arr:
        return arr

    middle = len(arr) // 2
    removed = arr.pop(middle)

    print("Removed from list:", removed)
    return arr


print("----- Python List -----")

numbers = [10, 20, 30, 40, 50]

print("Original List:", numbers)

numbers = remove_middle_list(numbers)

print("Updated List :", numbers)


# =====================================================
# Singly Linked List Implementation
# =====================================================

class Node:
    """Represents one node in the linked list."""

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    # Insert node at end
    def append(self, data):

        new_node = Node(data)

        if self.head is None:
            self.head = new_node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = new_node

    # Print linked list
    def display(self):

        current = self.head

        while current:
            print(current.data, end=" -> ")
            current = current.next

        print("None")

    # Remove middle node
    def remove_middle(self):

        if self.head is None:
            return

        if self.head.next is None:
            self.head = None
            return

        # Count number of nodes
        count = 0
        current = self.head

        while current:
            count += 1
            current = current.next

        middle = count // 2

        current = self.head
        previous = None

        for _ in range(middle):
            previous = current
            current = current.next

        print("Removed from linked list:", current.data)

        previous.next = current.next


print("\n----- Linked List -----")

ll = LinkedList()

for value in [10, 20, 30, 40, 50]:
    ll.append(value)

print("Original Linked List:")
ll.display()

ll.remove_middle()

print("Updated Linked List:")
ll.display()


# =====================================================
# Trade-Offs
# =====================================================

print("\n----- Trade-Offs -----")

print("""
Python List (Array)
-------------------
Advantages:
- Fast indexing: O(1)
- Easy to use.
- Memory efficient.

Disadvantages:
- Removing an element from the middle is O(n)
  because all remaining elements must shift.

Linked List
-----------
Advantages:
- Easy insertion/deletion once the node is found.
- No shifting of elements.

Disadvantages:
- Finding the middle requires traversal O(n).
- More memory is used because each node stores
  both data and a pointer to the next node.
- No direct indexing.

Big-O Summary
-------------
Python List:
    Access            : O(1)
    Remove Middle     : O(n)

Linked List:
    Access            : O(n)
    Remove Middle     : O(n)
        - O(n) to locate the middle
        - O(1) to delete once located
""")