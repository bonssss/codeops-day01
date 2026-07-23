from dataclasses import dataclass
from typing import List, Dict, Optional
import sys

# Mini Project: Bank Customer Service Simulator
# Uses:
# - Stack for transaction history (undo last transaction)
# - Dictionary for fast lookup by account number
# Bonus: time complexity comments included for main operations

# Time complexity notes (general):
# - Dictionary lookup/insertion/removal: O(1) average-case
# - Stack push/pop (list append/pop): O(1) amortized
# - Iterating over all accounts: O(n)

@dataclass
class Account:
    owner: str
    number: str
    balance: float = 0.0

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount

    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount


@dataclass
class Transaction:
    account_number: str
    action: str  # 'deposit' or 'withdraw'
    amount: float


class Stack:
    """Simple stack implemented with Python list.
    Push: append (O(1) amortized)
    Pop: pop() (O(1) amortized)
    """

    def __init__(self):
        self._data: List[Transaction] = []

    def push(self, item: Transaction):
        self._data.append(item)

    def pop(self) -> Optional[Transaction]:
        if not self._data:
            return None
        return self._data.pop()

    def peek(self) -> Optional[Transaction]:
        if not self._data:
            return None
        return self._data[-1]

    def is_empty(self) -> bool:
        return len(self._data) == 0


class BankSimulator:
    """Service uses a dict for fast account lookup and a stack for undo.

    - accounts: Dict[str, Account] provides O(1) lookup by account number.
    - history: Stack of Transaction objects to support undo (LIFO semantics).
    """

    def __init__(self):
        self.accounts: Dict[str, Account] = {}  # O(1) average-case operations
        self.history = Stack()

    def create_account(self, owner: str, number: str, balance: float = 0.0) -> Account:
        if number in self.accounts:
            raise ValueError("Account already exists")
        acct = Account(owner, number, balance)
        self.accounts[number] = acct  # O(1)
        return acct

    def find_account(self, number: str) -> Optional[Account]:
        # O(1) average-case dictionary lookup
        return self.accounts.get(number)

    def make_transaction(self, number: str, action: str, amount: float):
        acct = self.find_account(number)
        if acct is None:
            raise ValueError("Account not found")
        if action == "deposit":
            acct.deposit(amount)
            self.history.push(Transaction(number, action, amount))  # O(1)
        elif action == "withdraw":
            acct.withdraw(amount)
            self.history.push(Transaction(number, action, amount))  # O(1)
        else:
            raise ValueError("Unknown action")

    def undo_last_transaction(self) -> Optional[Transaction]:
        # Pop the most recent transaction and revert it.
        txn = self.history.pop()  # O(1)
        if txn is None:
            return None
        acct = self.find_account(txn.account_number)
        if acct is None:
            # Inconsistent state: transaction refers to missing account
            return txn
        # reverse the transaction
        if txn.action == "deposit":
            # to undo deposit, withdraw the amount
            try:
                acct.withdraw(txn.amount)
            except ValueError:
                # If withdraw fails (unexpected), keep state as-is and re-push
                self.history.push(txn)
                raise
        elif txn.action == "withdraw":
            # to undo withdraw, deposit the amount
            acct.deposit(txn.amount)
        return txn

    def search_customer(self, number: str) -> Optional[Account]:
        # O(1) lookup using dict
        return self.find_account(number)

    def performance_notes(self) -> str:
        # Brief comparison between dict+stack vs alternatives
        return (
            "Performance notes:\n"
            "- Dict (hash table) gives O(1) average lookup; lists would be O(n).\n"
            "- Stack (list append/pop) gives O(1) undo; using a queue or persistent log would have different trade-offs.\n"
        )


def run_demo():
    sim = BankSimulator()
    print("Creating demo accounts...")
    sim.create_account("Alice", "A001", 1000)
    sim.create_account("Bob", "B002", 500)
    print("Initial Balances:")
    for a in sim.accounts.values():
        print(a)
    print("\nMake transactions: Alice withdraw 200, Bob deposit 300")
    sim.make_transaction("A001", "withdraw", 200)
    sim.make_transaction("B002", "deposit", 300)
    print("Balances after transactions:")
    for a in sim.accounts.values():
        print(a)
    print("\nUndo last transaction (should undo Bob deposit)")
    undone = sim.undo_last_transaction()
    print("Undone:", undone)
    print("Balances after undo:")
    for a in sim.accounts.values():
        print(a)
    print("\nSearch for Alice (A001):", sim.search_customer("A001"))
    print("\n" + sim.performance_notes())


def main():
    sim = BankSimulator()
    # small CLI with required menu options
    def input_float(prompt: str) -> float:
        while True:
            try:
                return float(input(prompt))
            except ValueError:
                print("Invalid number")

    # Seed a couple accounts for convenience
    sim.create_account("Alice", "A001", 1000)
    sim.create_account("Bob", "B002", 500)

    if "--demo" in sys.argv:
        run_demo()
        return

    while True:
        print("\n--- ADDIS BANK SIMULATOR ---")
        print("1. Make a transaction (push to history)")
        print("2. Undo last transaction (pop)")
        print("3. Search customer by account number (dict lookup)")
        print("4. Show all accounts")
        print("0. Exit")
        choice = input("Choose option: ").strip()
        try:
            if choice == "1":
                number = input("Account Number: ").strip()
                acct = sim.search_customer(number)
                if acct is None:
                    print("Account not found")
                    continue
                action = input("Action (deposit/withdraw): ").strip().lower()
                amount = input_float("Amount: ")
                sim.make_transaction(number, action, amount)
                print("Transaction done")
            elif choice == "2":
                txn = sim.undo_last_transaction()
                if txn is None:
                    print("No transactions to undo")
                else:
                    print("Undone:", txn)
            elif choice == "3":
                number = input("Account Number: ").strip()
                acct = sim.search_customer(number)
                if acct:
                    print("Found:", acct)
                else:
                    print("Account not found")
            elif choice == "4":
                if not sim.accounts:
                    print("No accounts")
                else:
                    for a in sim.accounts.values():
                        print(a)
            elif choice == "0":
                break
            else:
                print("Invalid option")
        except Exception as e:
            print("Error:", e)


if __name__ == "__main__":
    main()
