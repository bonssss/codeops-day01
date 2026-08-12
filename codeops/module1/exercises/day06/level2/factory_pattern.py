# 2. Factory Pattern  
# Create an AccountFactory class with a create(kind, owner, number, balance) static 
# method that returns the correct account type (SavingsAccount, CurrentAccount, or 
# FixedDepositAccount).

class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        
    def __str__(self):
        return f"{self.__class__.__name__}(owner={self.owner}, number={self.number}, balance={self.balance})"

class SavingsAccount(Account):
    pass

class CurrentAccount(Account):
    pass

class FixedDepositAccount(Account):
    pass

class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float) -> Account:
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "fixed":
            return FixedDepositAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: {kind}")

# Usage
if __name__ == "__main__":
    savings = AccountFactory.create("savings", "Alice", "001", 5000)
    current = AccountFactory.create("current", "Bob", "002", 1000)
    fixed = AccountFactory.create("fixed", "Charlie", "003", 10000)
    
    print(savings)
    print(current)
    print(fixed)
