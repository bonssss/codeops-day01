# 8. Queue (FIFO)  
# o Implement a Queue class with enqueue and dequeue. Simulate a bank queue: 
# customers arrive and are served in order.
from collections import deque
class Queue:

    def __init__(self):
        self.items=deque()
    def enqueue(self,value):
        return self.items.append(value)
    def dequeue(self):
        if self.items:
            return self.items.popleft()
        else:
            return "Empty Queue"
    def __str__(self):
        return str(list(self.items))
    

queue=Queue()
queue.enqueue("bom")
print(queue)

queue.dequeue()
print(queue)
    