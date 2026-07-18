# 2. SavingsAccount Inheritance 
# • Using the Account class from Day 4: 
# o Create SavingsAccount that inherits from Account 
# o Add interest_rate data 
# o Add add_interest() method 

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

class SavingsAccount(Account):
    def __init__(self, owner, balance,interest_rate=0.15):
        super().__init__(owner, balance)
        self.interest_rate=interest_rate
    def add_interest(self):
        interest= self.balance * self.interest_rate
        self.deposit(interest)

acc = SavingsAccount("Bob", 1000,0.05)

print("Before interest:", acc.balance)

acc.add_interest()

print("After interest:", acc.balance)