# Create a small bank system with inheritance.

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited: ${amount}. New balance: ${self.balance}")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrew: ${amount}. New balance: ${self.balance}")
        else:
            print("Insufficient funds or invalid withdrawal amount.")

    def statement(self):
        print(f"Account Number: {self.number}")
        print(f"Account Holder: {self.owner}")
        print(f"Balance: ${self.balance}")

    @property
    def balance(self):
        return self.__balance


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.15):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Interest added: ${interest:.2f}")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount <= self.balance + self.overdraft:
            self._Account__balance -= amount
            print(f"Withdrew: ${amount}. New balance: ${self.balance}")
        else:
            print("Withdrawal exceeds available balance and overdraft.")


if __name__ == "__main__":
    savings = SavingsAccount("Bonsa", "S-1001", 1000, 0.10)
    savings.statement()
    savings.deposit(500)
    savings.add_interest()

    current = CurrentAccount("Sara", "C-2001", 300)
    current.statement()
    current.withdraw(500)
    current.withdraw(1500)
    