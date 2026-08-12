# 1. Apply SRP + DIP  
# Refactor the Account class so that it does only account-related logic (balance, 
# deposit, withdraw).  
# Move persistence and notification to separate classes. Use dependency injection.

from abc import ABC, abstractmethod

# Abstractions (DIP)
class INotifier(ABC):
    @abstractmethod
    def notify(self, message: str):
        pass

class IPersistence(ABC):
    @abstractmethod
    def save(self, account_data: dict):
        pass

# Concrete Implementations (SRP)
class EmailNotifier(INotifier):
    def notify(self, message: str):
        print(f"Sending Email: {message}")

class DatabasePersistence(IPersistence):
    def save(self, account_data: dict):
        print(f"Saving to DB: {account_data}")

# Account handles only account-related logic (SRP)
class Account:
    def __init__(self, account_id: str, balance: float, notifier: INotifier, persistence: IPersistence):
        self.account_id = account_id
        self.balance = balance
        # Dependency Injection (DIP)
        self.notifier = notifier
        self.persistence = persistence

    def deposit(self, amount: float):
        if amount > 0:
            self.balance += amount
            self.notifier.notify(f"Deposited {amount}. New balance: {self.balance}")
            self._save()

    def withdraw(self, amount: float):
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.notifier.notify(f"Withdrew {amount}. New balance: {self.balance}")
            self._save()
        else:
            self.notifier.notify(f"Failed withdrawal attempt of {amount}.")
            
    def _save(self):
        self.persistence.save({"id": self.account_id, "balance": self.balance})

# Usage
if __name__ == "__main__":
    email_notifier = EmailNotifier()
    db_persistence = DatabasePersistence()
    
    # Injecting dependencies
    account = Account("12345", 1000, email_notifier, db_persistence)
    account.withdraw(200)
    account.deposit(500)
