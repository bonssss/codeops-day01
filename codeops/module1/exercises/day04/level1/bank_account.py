# 3. Bank Account (Basic) 
# • Create an Account class with owner and balance. 
# • Add deposit(amount) and withdraw(amount) methods. 
# • Create an object and test deposits and withdrawals.

class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.balance=balance

    def deposit(self,amount):
        self.balance +=amount
    def withdraw(self,amount):
        if amount > self.balance:
            print("insuffcient banalce")
        else:
         self.balance -= amount

acc=Account("joo",100)
print("Owner:", acc.owner)
print("Balance:", acc.balance)

acc.deposit(300)
print("After deposit:", acc.balance)

acc.withdraw(200)
print("After withdrawal:", acc.balance)

acc.withdraw(500)
print("Final balance:", acc.balance)
