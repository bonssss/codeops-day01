# 9. Full SOLID Refactoring  
# Take a god class version of Account and refactor it using as many SOLID 
# principles as possible.

from abc import ABC, abstractmethod

# Interfaces (ISP)
class IAccount(ABC):
    @abstractmethod
    def withdraw(self, amount: float): pass
    
    @abstractmethod
    def deposit(self, amount: float): pass

class IInterestBearing(ABC):
    @abstractmethod
    def apply_interest(self): pass

class INotifier(ABC):
    @abstractmethod
    def notify(self, message: str): pass

class IPersistence(ABC):
    @abstractmethod
    def save(self, account: IAccount): pass

# Concrete Notifier (SRP)
class EmailNotifier(INotifier):
    def notify(self, message: str):
        print(f"Email sent: {message}")

# Concrete Persistence (SRP)
class DatabasePersistence(IPersistence):
    def save(self, account: IAccount):
        print(f"Account saved to database: {account.__dict__}")

# Core Account (SRP, OCP, DIP)
class Account(IAccount):
    def __init__(self, account_id: str, balance: float, notifier: INotifier, persistence: IPersistence):
        self.account_id = account_id
        self.balance = balance
        self.notifier = notifier
        self.persistence = persistence

    def deposit(self, amount: float):
        self.balance += amount
        self.notifier.notify(f"Deposited {amount}")
        self.persistence.save(self)

    def withdraw(self, amount: float):
        if self.balance >= amount:
            self.balance -= amount
            self.notifier.notify(f"Withdrew {amount}")
            self.persistence.save(self)
        else:
            self.notifier.notify("Withdrawal failed: Insufficient funds")

# Specialized Account (LSP, ISP, OCP)
class SavingsAccount(Account, IInterestBearing):
    def __init__(self, account_id: str, balance: float, notifier: INotifier, persistence: IPersistence, interest_rate: float):
        super().__init__(account_id, balance, notifier, persistence)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)

# Usage
if __name__ == "__main__":
    notifier = EmailNotifier()
    db = DatabasePersistence()
    
    savings = SavingsAccount("SAV-001", 1000, notifier, db, 0.05)
    savings.deposit(500)
    savings.withdraw(200)
    savings.apply_interest()
