# 1. Tree Basics  
# o Create a TreeNode class.  
# o Build a small bank hierarchy: 
# ▪ Head Office 
# ▪ Bole Branch 
# ➢ Teller 
# ➢ Loan Officer 
# ▪ Piassa Branch 
# o Write a function to print the tree.


class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child):
        self.children.append(child)


def print_tree(node, level=0):
    indent = "  " * level
    print(f"{indent}{node.name}")

    for child in node.children:
        print_tree(child, level + 1)


if __name__ == "__main__":
    head_office = TreeNode("Head Office")
    bole_branch = TreeNode("Bole Branch")
    piassa_branch = TreeNode("Piassa Branch")
    teller = TreeNode("Teller")
    loan_officer = TreeNode("Loan Officer")

    bole_branch.add_child(teller)
    bole_branch.add_child(loan_officer)
    head_office.add_child(bole_branch)
    head_office.add_child(piassa_branch)

    print("Bank Hierarchy Tree")
    print_tree(head_office)
