# 11. Refactoring Challenge  
# o Add a new account type InvestmentAccount to your system.  
# o Show how your design (especially OCP + Factory) makes this change easy.

# Account Base
class Account:
    def __init__(self, account_id: str, balance: float):
        self.account_id = account_id
        self.balance = balance

    def __str__(self):
        return f"{self.__class__.__name__}(ID: {self.account_id}, Balance: {self.balance})"

class SavingsAccount(Account): pass
class CurrentAccount(Account): pass

# ---------------------------------------------------------
# EXTENSION (Adding InvestmentAccount without modifying existing accounts)
# This demonstrates the Open/Closed Principle (OCP).
# ---------------------------------------------------------
class InvestmentAccount(Account):
    def __init__(self, account_id: str, balance: float, portfolio_risk: str = "Medium"):
        super().__init__(account_id, balance)
        self.portfolio_risk = portfolio_risk

    def __str__(self):
        return super().__str__() + f" [Risk: {self.portfolio_risk}]"

# ---------------------------------------------------------
# EXTENDED FACTORY
# We only modify the Factory to register the new account type.
# We can also use a dynamic registry to make the Factory itself OCP-compliant.
# ---------------------------------------------------------
class AccountFactory:
    _account_registry = {
        "savings": SavingsAccount,
        "current": CurrentAccount,
        "investment": InvestmentAccount  # Easy addition here!
    }

    @classmethod
    def register_account_type(cls, name: str, account_class: type):
        """Allows adding new types at runtime without changing the Factory code! (OCP)"""
        cls._account_registry[name] = account_class

    @classmethod
    def create_account(cls, account_type: str, account_id: str, balance: float, **kwargs) -> Account:
        account_class = cls._account_registry.get(account_type.lower())
        if not account_class:
            raise ValueError(f"Unknown account type: {account_type}")
        return account_class(account_id, balance, **kwargs)

# Usage
if __name__ == "__main__":
    # Create standard accounts
    sav = AccountFactory.create_account("savings", "SAV-01", 1000)
    
    # Create the NEW InvestmentAccount easily!
    inv = AccountFactory.create_account("investment", "INV-01", 50000, portfolio_risk="High")
    
    print(sav)
    print(inv)
