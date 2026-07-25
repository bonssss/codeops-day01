# 6. Encapsulation Practice 
# • Modify your Account class from exercise 3: 
# o Make balance private (__balance) 
# o Add a @property for balance (read-only / getter) 
# o Improve withdraw() with proper validation 

class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.__balance=balance
    @property
    def balance(self):
        return self.__balance

    def deposit(self,amount):
        if amount>0:

            self.__balance +=amount
        else:
            print("Deposit must be positive number")
    def withdraw(self,amount):
        if amount > self.__balance:
            print("insuffcient balance")
        elif amount <= 0:
            print("Withdrawal amount must be positive.")
        else:
         self.__balance -= amount

acc =Account("bob",1000)
print(acc.balance)

acc.deposit(100)
print(acc.balance)

acc.withdraw(200)
print(acc.owner)
print(acc.balance)
 
    
