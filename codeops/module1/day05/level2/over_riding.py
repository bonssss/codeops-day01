# 4. Method Overriding 
# • In CurrentAccount, override the statement() method to show overdraft info. 
# • In SavingsAccount, override statement() to show interest rate.


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

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, balance,interest_rate=0.15):
        super().__init__(owner, balance)
        self.interest_rate=interest_rate
    def add_interest(self):
        interest= self.balance * self.interest_rate
        self.deposit(interest)
    def statement(self):
        super().statement()
        print(f"Interest rate :{self.interest_rate *100}%")
class CurrentAccount(Account):
    def __init__(self, owner, balance,overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit=overdraft_limit
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft_limit:
            print("Overdraft limit exceeded.")
        else:
            self.balance = self.balance - amount
            print(f"Withdrew {amount}")
    def statement(self):
        super().statement()
        print(f"Overdraft Limit: {self.overdraft_limit}")

acc1 = SavingsAccount("Bob", 1000, 0.10)
acc2 = CurrentAccount("Alice", 500, 300)

acc1.statement()
print()

acc2.statement()