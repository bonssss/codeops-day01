from abc import ABC, abstractmethod
from typing import List, Optional
from dataclasses import dataclass
import os


# This bank system demonstrates OOP concepts and design patterns:
# - Abstraction: Account and NotificationObserver define abstract behaviors.
# - Encapsulation: Account balance is managed via a property.
# - Inheritance: SavingsAccount, CurrentAccount, and FixedDepositAccount extend Account.
# - Polymorphism: Different account types override common methods.
# - Singleton: BankConfig provides shared bank rules.
# - Factory: AccountFactory creates account objects by type.
# - Observer: SmsNotifier and AuditLogObserver react to large withdrawals.
class InputValidator:
    @staticmethod
    def get_float(message, default=None):
        while True:
            try:
                value = input(message)
                if value == "" and default is not None:
                    return default
                return float(value)
            except ValueError:
                print("Invalid input. Please enter a number.")

    @staticmethod
    def get_int(message):
        while True:
            try:
                return int(input(message))
            except ValueError:
                print("Invalid input. Please enter an integer.")


class BankConfig:
    # Singleton pattern: only one shared configuration object exists.
    _instance = None

    def __init__(self):
        self.interest_rate = 0.10
        self.overdraft_limit = 1000.0
        self.large_withdrawal_threshold = 500.0

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def reset(self):
        self.interest_rate = 0.10
        self.overdraft_limit = 1000.0
        self.large_withdrawal_threshold = 500.0


class NotificationObserver(ABC):
    # Observer pattern interface for notifications about account events.
    @abstractmethod
    def update(self, account, amount):
        pass


class SmsNotifier(NotificationObserver):
    # Concrete observer that sends an SMS-like message.
    def update(self, account, amount):
        print(f"SMS alert: Large withdrawal of {amount} from account {account.number}")


class AuditLogObserver(NotificationObserver):
    # Concrete observer that logs withdrawal events to a file.
    def __init__(self, log_file="audit_log.txt"):
        self.log_file = log_file
        self.entries = []

    def update(self, account, amount):
        entry = f"{account.number}:{account.owner}:{amount}"
        self.entries.append(entry)
        with open(self.log_file, "a", encoding="utf-8") as handle:
            handle.write(entry + "\n")
        print(f"Audit log updated in {self.log_file}")


class Account(ABC):
    # Abstract base class for all accounts.
    # Encapsulates common behavior and forces subclasses to implement account-specific interest rules.
    def __init__(self, owner, number, balance=0.0):
        self.owner = owner
        self.number = number
        self._balance = balance
        self._observers: List[NotificationObserver] = []

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, amount):
        if amount >= 0:
            self._balance = amount
        else:
            raise ValueError("Balance cannot be negative.")

    def attach_observer(self, observer):
        self._observers.append(observer)

    def detach_observer(self, observer):
        self._observers.remove(observer) if observer in self._observers else None

    def notify_observers(self, amount):
        for observer in self._observers:
            observer.update(self, amount)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive.")
        self._balance += amount
        print(f"Deposited {amount}")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            raise ValueError("Insufficient balance.")
        self._balance -= amount
        print(f"Withdrawn {amount}")
        if amount >= BankConfig.get_instance().large_withdrawal_threshold:
            self.notify_observers(amount)

    def statement(self):
        print("--------------------------")
        print("Account Type:", self.__class__.__name__)
        print("Account No:", self.number)
        print("Owner:", self.owner)
        print("Balance:", self.balance)

    @abstractmethod
    def calculate_interest(self):
        pass

    @abstractmethod
    def add_interest(self):
        pass


class SavingsAccount(Account):
    # Concrete savings account with interest calculation.
    def __init__(self, owner, number, balance, rate=None):
        super().__init__(owner, number, balance)
        self.rate = rate if rate is not None else BankConfig.get_instance().interest_rate

    def calculate_interest(self):
        return self.balance * self.rate

    def add_interest(self):
        interest = self.calculate_interest()
        self.balance = self.balance + interest
        print(f"Interest added: {interest}")

    def statement(self):
        super().statement()
        print(f"Interest Rate: {self.rate * 100}%")


class CurrentAccount(Account):
    # Concrete account type with overdraft support.
    def __init__(self, owner, number, balance, overdraft_limit=None):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit if overdraft_limit is not None else BankConfig.get_instance().overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.balance + self.overdraft_limit:
            raise ValueError("Overdraft limit exceeded.")
        self.balance = self.balance - amount
        print(f"Withdrawn {amount}")
        if amount >= BankConfig.get_instance().large_withdrawal_threshold:
            self.notify_observers(amount)

    def calculate_interest(self):
        return 0

    def add_interest(self):
        print("Current account does not earn interest.")

    def statement(self):
        super().statement()
        print("Overdraft Limit:", self.overdraft_limit)


class FixedDepositAccount(SavingsAccount):
    # Specialized savings account with a fixed deposit period.
    def __init__(self, owner, number, balance, rate=None, years=1):
        super().__init__(owner, number, balance, rate)
        self.years = years

    def statement(self):
        super().statement()
        print("Fixed Period:", self.years, "years")


class AccountFactory:
    # Factory pattern: instantiate different account classes based on account type.
    @staticmethod
    def create_account(account_type, owner, number, balance, config):
        normalized = account_type.lower()
        if normalized == "savings":
            return SavingsAccount(owner, number, balance, rate=config.interest_rate)
        if normalized == "current":
            return CurrentAccount(owner, number, balance, overdraft_limit=config.overdraft_limit)
        if normalized == "fixed":
            return FixedDepositAccount(owner, number, balance, rate=config.interest_rate, years=1)
        raise ValueError("Unsupported account type.")


# Command pattern: encapsulate transactions so undo is robust
class Command(ABC):
    @abstractmethod
    def execute(self, service):
        pass

    @abstractmethod
    def undo(self, service):
        pass


class DepositCommand(Command):
    def __init__(self, account_number: str, amount: float):
        self.account_number = account_number
        self.amount = amount

    def execute(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError("Account not found.")
        acct.deposit(self.amount)

    def undo(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError("Account not found.")
        acct.withdraw(self.amount)


class WithdrawCommand(Command):
    def __init__(self, account_number: str, amount: float):
        self.account_number = account_number
        self.amount = amount

    def execute(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError("Account not found.")
        acct.withdraw(self.amount)

    def undo(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError("Account not found.")
        acct.deposit(self.amount)


class Stack:
    """LIFO stack implemented with list for Command objects.
    - push: O(1) amortized
    - pop: O(1) amortized
    """

    def __init__(self):
        self._data: List[Command] = []

    def push(self, item: Command):
        self._data.append(item)

    def pop(self) -> Optional[Command]:
        if not self._data:
            return None
        return self._data.pop()

    def peek(self) -> Optional[Command]:
        if not self._data:
            return None
        return self._data[-1]

    def is_empty(self) -> bool:
        return len(self._data) == 0


class BankService:
    # Service layer separates business logic from user interaction.
    """Service layer using a dictionary for accounts and a stack for transaction history.

    Data structure choices and time complexity:
    - accounts: dict[str, Account] for O(1) average-case lookup/insertion/removal.
    - history: Stack for O(1) push/pop to support undo.
    """

    def __init__(self):
        # Dictionary mapping account number -> Account (O(1) average ops)
        self.accounts: dict[str, Account] = {}
        self._config = BankConfig.get_instance()
        # Stack to record transactions for undo support (LIFO)
        self.history = Stack()

    def find_account(self, number):
        # O(1) average-case dictionary lookup
        return self.accounts.get(number)

    def create_account(self, account_type, owner, number, balance, config=None):
        if number in self.accounts:
            raise ValueError("Account already exists.")
        config = config or self._config
        account = AccountFactory.create_account(account_type, owner, number, balance, config)
        account.attach_observer(SmsNotifier())
        account.attach_observer(AuditLogObserver())
        # O(1) insertion
        self.accounts[number] = account
        return account

    def deposit(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError("Account not found.")
        # Use Command pattern: create, execute, and record command
        cmd = DepositCommand(number, amount)
        cmd.execute(self)
        self.history.push(cmd)

    def withdraw(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError("Account not found.")
        # Use Command pattern: create, execute, and record command
        cmd = WithdrawCommand(number, amount)
        cmd.execute(self)
        self.history.push(cmd)

    def undo_last_transaction(self):
        # pop last transaction (O(1)) and revert it
        cmd = self.history.pop()
        if cmd is None:
            return None
        # undo the command
        cmd.undo(self)
        return cmd

    def apply_interest_to_all(self):
        # O(n) to iterate over all accounts
        for account in self.accounts.values():
            if isinstance(account, SavingsAccount):
                account.add_interest()

    def show_all_accounts(self):
        # return view of accounts (values)
        return list(self.accounts.values())

    def performance_notes(self) -> str:
        return (
            "Dict vs List: dict gives O(1) average lookup; list would be O(n).\n"
            "Stack (list append/pop) gives O(1) amortized push/pop for undo.\n"
            "For small data sets differences are minor; for large sets, dict scales much better for lookups."
        )


def get_float(message, default=None):
    return InputValidator.get_float(message, default)


def get_int(message):
    return InputValidator.get_int(message)


def main():
    service = BankService()
    while True:
        print("\n====== ADDIS BANK SYSTEM ======")
        print("1. Make a transaction (push to history)")
        print("2. Undo last transaction (pop)")
        print("3. Search customer by account number")
        print("4. Create Account")
        print("5. Show All Accounts")
        print("6. Apply Interest to Savings Accounts")
        print("7. Update Bank Rules")
        print("0. Exit")

        choice = input("Choose option: ")

        try:
            if choice == "1":
                number = input("Account Number: ").strip()
                acct = service.find_account(number)
                if acct is None:
                    print("Account not found.")
                    continue
                action = input("Action (deposit/withdraw): ").strip().lower()
                amount = get_float("Amount: ")
                if action == "deposit":
                    service.deposit(number, amount)
                elif action == "withdraw":
                    service.withdraw(number, amount)
                else:
                    print("Unknown action")

            elif choice == "2":
                txn = service.undo_last_transaction()
                if txn is None:
                    print("No transactions to undo.")
                else:
                    print(f"Undid transaction: {txn}")

            elif choice == "3":
                number = input("Account Number: ").strip()
                account = service.find_account(number)
                if account is None:
                    print("Account not found.")
                else:
                    account.statement()

            elif choice == "4":
                owner = input("Owner: ").strip()
                number = input("Account Number: ").strip()
                acct_type = input("Type (savings/current/fixed): ").strip().lower()
                balance = get_float("Initial Balance: ")
                account = service.create_account(acct_type, owner, number, balance)
                print(f"Account {account.number} created.")

            elif choice == "5":
                all_accts = service.show_all_accounts()
                if not all_accts:
                    print("No accounts.")
                else:
                    for account in all_accts:
                        account.statement()

            elif choice == "6":
                service.apply_interest_to_all()
                print("Interest applied.")

            elif choice == "7":
                config = BankConfig.get_instance()
                config.interest_rate = get_float("New interest rate (e.g. 0.08): ", default=config.interest_rate)
                config.overdraft_limit = get_float("New overdraft limit: ", default=config.overdraft_limit)
                config.large_withdrawal_threshold = get_float("Large withdrawal threshold: ", default=config.large_withdrawal_threshold)
                print("Bank rules updated.")

            elif choice == "0":
                print("Thank you for using Addis Bank.")
                break

            else:
                print("Invalid option.")
        except ValueError as error:
            print(f"Error: {error}")


if __name__ == "__main__":
    main()
