# queue

from collections import deque

x=deque()
x.append(234)
x.append(34)
x.append(3)

print(x)

remove=x.popleft()
print(remove)
print(x)


# stack
stack=[]

stack.append(5)
stack.append(2)
stack.append(6)
print(stack)

stack.pop()
print(stack)