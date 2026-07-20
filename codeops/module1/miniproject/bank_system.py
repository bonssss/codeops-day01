from abc import ABC, abstractmethod
from typing import List
import os


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
    @abstractmethod
    def update(self, account, amount):
        pass


class SmsNotifier(NotificationObserver):
    def update(self, account, amount):
        print(f"SMS alert: Large withdrawal of {amount} from account {account.number}")


class AuditLogObserver(NotificationObserver):
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
    def __init__(self, owner, number, balance, rate=None, years=1):
        super().__init__(owner, number, balance, rate)
        self.years = years

    def statement(self):
        super().statement()
        print("Fixed Period:", self.years, "years")


class AccountFactory:
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


class BankService:
    def __init__(self):
        self.accounts: List[Account] = []
        self._config = BankConfig.get_instance()

    def find_account(self, number):
        for account in self.accounts:
            if account.number == number:
                return account
        return None

    def create_account(self, account_type, owner, number, balance, config=None):
        if self.find_account(number) is not None:
            raise ValueError("Account already exists.")
        config = config or self._config
        account = AccountFactory.create_account(account_type, owner, number, balance, config)
        account.attach_observer(SmsNotifier())
        account.attach_observer(AuditLogObserver())
        self.accounts.append(account)
        return account

    def deposit(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError("Account not found.")
        account.deposit(amount)

    def withdraw(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError("Account not found.")
        account.withdraw(amount)

    def apply_interest_to_all(self):
        for account in self.accounts:
            if isinstance(account, SavingsAccount):
                account.add_interest()

    def show_all_accounts(self):
        return self.accounts


def get_float(message, default=None):
    return InputValidator.get_float(message, default)


def get_int(message):
    return InputValidator.get_int(message)


def main():
    service = BankService()
    while True:
        print("\n====== ADDIS BANK SYSTEM ======")
        print("1. Create Savings Account")
        print("2. Create Current Account")
        print("3. Create Fixed Deposit Account")
        print("4. Deposit")
        print("5. Withdraw")
        print("6. Show Statement")
        print("7. Apply Interest")
        print("8. Show All Accounts")
        print("9. Update Bank Rules")
        print("0. Exit")

        choice = input("Choose option: ")

        try:
            if choice == "1":
                owner = input("Owner: ").strip()
                number = input("Account Number: ").strip()
                balance = get_float("Initial Balance: ")
                account = service.create_account("savings", owner, number, balance)
                print("Savings Account Created.")
                print(f"Account {account.number} ready.")

            elif choice == "2":
                owner = input("Owner: ").strip()
                number = input("Account Number: ").strip()
                balance = get_float("Initial Balance: ")
                account = service.create_account("current", owner, number, balance)
                print("Current Account Created.")
                print(f"Account {account.number} ready.")

            elif choice == "3":
                owner = input("Owner: ").strip()
                number = input("Account Number: ").strip()
                balance = get_float("Initial Balance: ")
                account = service.create_account("fixed", owner, number, balance)
                print("Fixed Deposit Created.")
                print(f"Account {account.number} ready.")

            elif choice == "4":
                number = input("Account Number: ").strip()
                amount = get_float("Amount: ")
                service.deposit(number, amount)

            elif choice == "5":
                number = input("Account Number: ").strip()
                amount = get_float("Amount: ")
                service.withdraw(number, amount)

            elif choice == "6":
                number = input("Account Number: ").strip()
                account = service.find_account(number)
                if account is None:
                    print("Account not found.")
                else:
                    account.statement()

            elif choice == "7":
                service.apply_interest_to_all()
                print("Interest applied.")

            elif choice == "8":
                if not service.accounts:
                    print("No accounts.")
                else:
                    for account in service.accounts:
                        account.statement()

            elif choice == "9":
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
