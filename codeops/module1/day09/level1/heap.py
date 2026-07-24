# 4. Heap Basics
# o Use heapq to create a priority queue for urgent transactions.
# o Add: (5000, "Big Loan"), (200, "Small Deposit"), (10000, "Fraud Alert").
# o Pop the highest priority item.

import heapq

urgent_transactions = []

for priority, label in [(5000, "Big Loan"), (200, "Small Deposit"), (10000, "Fraud Alert")]:
    heapq.heappush(urgent_transactions, (-priority, label))

highest_priority = heapq.heappop(urgent_transactions)
print(f"Highest priority: {highest_priority[1]} ({-highest_priority[0]})")

