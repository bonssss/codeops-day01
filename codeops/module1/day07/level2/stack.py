# 7. Stack (LIFO)  
# o Implement a Stack class using a list with push, pop, and peek. Use it to reverse a 
# string: "Addis Ababa" → "ababa siddA".

class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if self.items:
            return self.items.pop()
        else:
            return "Empty stack"

    def peek(self):
        if self.items:
            return self.items[-1]
        else:
            return "Empty Stack"

    def __str__(self):
        return str(self.items)
            
stack=Stack()
stack.push(20)
stack.push(67)
stack.push(34)
print(stack.items)

stack.pop()
stack.pop()
stack.pop()
print(stack.pop())



print(stack.items)

print(stack.peek())

# reverse string

text="Addis ababa"

stack=Stack()

for char in text:
    stack.push(char)

print(stack)

reversed_text = ""

while stack.items:
    reversed_text += stack.pop()
print(reversed_text)

