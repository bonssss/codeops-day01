# 10. Combine Factory + Observer + Singleton
# Create: 
# o BankConfig as Singleton (for interest rates) 
# o AccountFactory to create accounts 
# o Observer system that notifies on big transactions

from abc import ABC, abstractmethod

# 1. Singleton BankConfig
class BankConfig:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            # Default configuration
            cls._instance.savings_rate = 0.05
            cls._instance.large_transaction_threshold = 10000
        return cls._instance

# 2. Observer System
class IObserver(ABC):
    @abstractmethod
    def update(self, account_id: str, amount: float):
        pass

class FraudAlertObserver(IObserver):
    def update(self, account_id: str, amount: float):
        print(f"[FRAUD ALERT] Large transaction of {amount} on account {account_id}!")

class AccountObservable:
    def __init__(self):
        self._observers = []

    def attach(self, observer: IObserver):
        self._observers.append(observer)

    def notify(self, account_id: str, amount: float):
        for observer in self._observers:
            observer.update(account_id, amount)

# Account Base
class Account(AccountObservable):
    def __init__(self, account_id: str, balance: float):
        super().__init__()
        self.account_id = account_id
        self.balance = balance
        self.config = BankConfig()

    def deposit(self, amount: float):
        self.balance += amount
        print(f"Deposited {amount} into {self.account_id}. Balance: {self.balance}")
        if amount >= self.config.large_transaction_threshold:
            self.notify(self.account_id, amount)

# Savings Account
class SavingsAccount(Account):
    def apply_interest(self):
        interest = self.balance * self.config.savings_rate
        self.balance += interest
        print(f"Applied interest {interest}. New Balance: {self.balance}")

# Current Account
class CurrentAccount(Account):
    pass

# 3. Factory
class AccountFactory:
    @staticmethod
    def create_account(account_type: str, account_id: str, balance: float) -> Account:
        if account_type.lower() == "savings":
            return SavingsAccount(account_id, balance)
        elif account_type.lower() == "current":
            return CurrentAccount(account_id, balance)
        else:
            raise ValueError(f"Unknown account type: {account_type}")

# Usage
if __name__ == "__main__":
    # Configure Singleton
    config = BankConfig()
    config.savings_rate = 0.07
    config.large_transaction_threshold = 5000
    
    # Use Factory
    savings = AccountFactory.create_account("savings", "SAV-99", 1000)
    
    # Use Observer
    fraud_alert = FraudAlertObserver()
    savings.attach(fraud_alert)
    
    # Test
    savings.apply_interest()
    savings.deposit(2000)  # Normal
    savings.deposit(6000)  # Triggers Observer
