# 6. Linked List Basics  
# o Implement a simple Node class and a LinkedList class with: 
# • append(value) 
# • print_list()

class Node:
    def __init__(self,value):
        self.value=value
        self.next=None

class LinkedList:
    def __init__(self):
        self.head=None
    def append(self,value):
        new_node=Node(value)

        if self.head is None:
            self.head=new_node
            return
        
        current = self.head
        while current.next:
            current=current.next
        current.next=new_node
    def print_list(self):
        current=self.head

        while current:
            print(current.value, end="->")
            current =current.next
        print("None")

    
ll = LinkedList()

ll.append(10)
ll.append(20)
ll.append(30)
ll.append(40)

ll.print_list()

