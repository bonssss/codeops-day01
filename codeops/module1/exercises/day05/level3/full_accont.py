from abc import ABC, abstractmethod


class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

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

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")

    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    @property
    def interest_rate(self):
        return self.__interest_rate

    @interest_rate.setter
    def interest_rate(self, rate):
        if rate >= 0:
            self.__interest_rate = rate
        else:
            print("Interest rate cannot be negative.")

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def add_interest(self):
        self.deposit(self.calculate_interest())

    def statement(self):
        super().statement()
        print(f"Interest Rate: {self.interest_rate * 100}%")


class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    @property
    def overdraft_limit(self):
        return self.__overdraft_limit

    @overdraft_limit.setter
    def overdraft_limit(self, limit):
        if limit >= 0:
            self.__overdraft_limit = limit
        else:
            print("Overdraft limit cannot be negative.")

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
        print(f"Overdraft Limit: {self.overdraft_limit}")


# ----------------------
# Testing
# ----------------------

saving = SavingsAccount("Bob", 1000, 0.10)
current = CurrentAccount("Alice", 500, 300)

saving.statement()
print()

current.statement()

print("\nInterest:", saving.calculate_interest())

saving.add_interest()
print("Savings Balance:", saving.balance)

current.withdraw(700)
print("Current Balance:", current.balance)