# 6. Abstract Base Class 
# • Make Account an abstract class using ABC and @abstractmethod 
# • Add abstract method calculate_interest() 
# • Update SavingsAccount and CurrentAccount to implement it 

from abc import ABC, abstractmethod


class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance

    # Getter
    @property
    def balance(self):
        return self.__balance

    # Setter
    @balance.setter
    def balance(self, amount):
        self.__balance = amount

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited {amount}")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            print(f"Withdrew {amount}")

    def transfer(self, to_account, amount):
        if amount <= 0:
            print("Transfer amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            to_account.deposit(amount)
            print(f"Transferred {amount} to {to_account.owner}")

    def statement(self):
        print(f"Owner   : {self.owner}")
        print(f"Balance : {self.balance}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def add_interest(self):
        interest = self.calculate_interest()
        self.deposit(interest)

    def statement(self):
        super().statement()
        print(f"Interest Rate : {self.interest_rate * 100}%")



class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft_limit:
            print("Overdraft limit exceeded.")
        else:
            self.balance = self.balance - amount
            print(f"Withdrew {amount}")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print(f"Overdraft Limit : {self.overdraft_limit}")


# ----------------------------
# Testing
# ----------------------------

print("===== Savings Account =====")
savings = SavingsAccount("Bob", 1000, 0.10)

savings.statement()
print("Interest:", savings.calculate_interest())

savings.add_interest()
print("Balance after interest:", savings.balance)

savings.deposit(500)
savings.withdraw(300)
print("Balance:", savings.balance)


print("\n===== Current Account =====")
current = CurrentAccount("Alice", 500, 300)

current.statement()
print("Interest:", current.calculate_interest())

current.withdraw(700)
print("Balance:", current.balance)

current.withdraw(200)

current.deposit(500)
print("Balance:", current.balance)


print("\n===== Transfer =====")
savings.transfer(current, 200)

print("Savings Balance:", savings.balance)
print("Current Balance:", current.balance)


print("\n===== Polymorphism =====")

accounts = [savings, current]

for account in accounts:
    print("-" * 30)
    account.statement()
    account.deposit(100)
    print("New Balance:", account.balance)