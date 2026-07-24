# 2. Binary Search Tree  
# o Create a BST and insert these values: 50, 30, 70, 20, 40, 60.  
# o Search for 40 and 100. Print whether they exist.

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None or node.value == value:
            return node
        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)

# Usage
bst = BinarySearchTree()
for num in [50, 30, 70, 20, 40, 60]:
    bst.insert(num)

for value in [40, 100]:
    exists = bst.search(value) is not None
    print(f"{value} exists: {exists}")