# 4. Interface Segregation (ISP)  
# Create a small InterestBearing interface and make only SavingsAccount implement 
# it. CurrentAccount should not be forced to implement interest methods.

from abc import ABC, abstractmethod

# Base class for all accounts
class Account(ABC):
    def __init__(self, account_id: str, balance: float):
        self.account_id = account_id
        self.balance = balance

    @abstractmethod
    def withdraw(self, amount: float):
        pass

    @abstractmethod
    def deposit(self, amount: float):
        pass

# Segregated Interface for Interest
class InterestBearing(ABC):
    @abstractmethod
    def apply_interest(self):
        pass

# SavingsAccount implements Account and InterestBearing
class SavingsAccount(Account, InterestBearing):
    def __init__(self, account_id: str, balance: float, interest_rate: float):
        super().__init__(account_id, balance)
        self.interest_rate = interest_rate

    def withdraw(self, amount: float):
        if self.balance >= amount:
            self.balance -= amount
            
    def deposit(self, amount: float):
        self.balance += amount

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Applied interest {interest}. New balance: {self.balance}")

# CurrentAccount only implements Account, doesn't need to implement InterestBearing
class CurrentAccount(Account):
    def __init__(self, account_id: str, balance: float, overdraft_limit: float):
        super().__init__(account_id, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount: float):
        if self.balance + self.overdraft_limit >= amount:
            self.balance -= amount

    def deposit(self, amount: float):
        self.balance += amount

# Usage
if __name__ == "__main__":
    savings = SavingsAccount("SAV-1", 1000, 0.05)
    savings.apply_interest()
    
    current = CurrentAccount("CUR-1", 1000, 500)
    current.withdraw(1200)
    print(f"Current Account Balance: {current.balance}")
