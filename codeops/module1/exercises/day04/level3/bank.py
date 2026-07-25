# 7. Full Bank Account with Properties: Create a robust BankAccount class that includes: 
# • Private __balance 
# • @property for balance (getter and setter) 
# • deposit() with validation (positive amount only) 
# • withdraw() with sufficient funds check 
# • transfer(to_account, amount) method 
# • Create a BankAccount object and test add, borrow & return methods.



class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.__balance=balance
    # getter
    @property
    def balance(self):
        return self.__balance
    
    # setter
    @balance.setter
    def balance(self,amount):
        if amount >=0:
            self.__balance=amount
        else:
            print("Balance can't negative")

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
    def transfer(self,to_account,amount):
        if amount <=0:
            print("amount should be positive")
        elif amount > self.__balance:
            print("Insufficinet balance to tranfer")
    
        else:
            self.__balance-=amount
            to_account.deposit(amount)
            print(f"Transeferred {amount} to {to_account.owner}")

acc1 = Account("Bob", 1000)
acc2 = Account("Alice", 500)

print(acc1.balance)
print(acc2.balance)

acc1.deposit(200)
acc1.withdraw(100)

acc1.transfer(acc2, 300)

print("Bob's balance:", acc1.balance)
print("Alice's balance:", acc2.balance)
 
    
