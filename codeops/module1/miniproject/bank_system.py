from abc import ABC, abstractmethod
from typing import Final, List, Optional
from dataclasses import dataclass
from collections import deque
import heapq
import os


ACCOUNT_NOT_FOUND_MESSAGE: Final[str] = "Account not found."
INVALID_FIELD_MESSAGE: Final[str] = "Field must be amount or date."
CHOOSE_OPTION_PROMPT: Final[str] = "Choose option: "
ACCOUNT_NUMBER_PROMPT: Final[str] = "Account Number: "
INVALID_OPTION_MESSAGE: Final[str] = "Invalid option."


@dataclass
class Transaction:
    amount: float
    date: str
    type: str


# This bank system demonstrates OOP concepts and design patterns:
# - Abstraction: Account and NotificationObserver define abstract behaviors.
# - Encapsulation: Account balance is managed via a property.
# - Inheritance: SavingsAccount, CurrentAccount, and FixedDepositAccount extend Account.
# - Polymorphism: Different account types override common methods.
# - Singleton: BankConfig provides shared bank rules.
# - Factory: AccountFactory creates account objects by type.
# - Observer: SmsNotifier and AuditLogObserver react to large withdrawals.
class InputValidator:
    # This helper class shows modular programming and reusability.
    # It keeps input validation logic in one place so the main program stays clean.
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


class AccountRegistry(dict):
    """Dictionary-like container that also supports integer indexing for tests and simple iteration.
    This shows how custom data structures can extend built-in ones for a specific purpose.
    """

    def __getitem__(self, key):
        if isinstance(key, int):
            if key < 0:
                raise IndexError("Index cannot be negative.")
            values = list(self.values())
            if key >= len(values):
                raise IndexError("Account index out of range.")
            return values[key]
        return super().__getitem__(key)


class BankConfig:
    # Singleton pattern: only one shared configuration object exists.
    # Purpose: ensure all account behavior uses the same bank rules (interest, overdraft, thresholds).
    _instance = None

    def __init__(self):
        self._apply_defaults()

    def _apply_defaults(self):
        self.interest_rate = 0.10
        self.overdraft_limit = 1000.0
        self.large_withdrawal_threshold = 500.0

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def reset(self):
        self._apply_defaults()


class NotificationObserver(ABC):
    # Observer pattern interface for notifications about account events.
    # Purpose: allow different modules (SMS, audit log) to react when an account event happens.
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
    # Purpose: demonstrate abstraction and encapsulation.
    # Abstraction hides the common account behavior behind a single interface,
    # while encapsulation keeps balance and account state protected inside the class.
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
    # Inheritance and polymorphism example.
    # Purpose: reuse the common Account behavior while customizing savings-specific logic.
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
    # Another inheritance example with custom behavior.
    # Purpose: show that different account types can override the same methods differently.
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
    # Purpose: centralize account creation and keep the main code simple and flexible.
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
class TreeNode:
    # Tree data structure node.
    # Purpose: represent a branch or employee in the bank hierarchy.
    def __init__(self, name: str, node_type: str = "branch"):
        self.name = name
        self.node_type = node_type
        self.children: List[TreeNode] = []

    def add_child(self, child: "TreeNode"):
        self.children.append(child)


class BranchTree:
    """Simple tree for bank branches and employees.
    Purpose: model a hierarchy such as main branch -> regional branch -> employee.
    This demonstrates the Tree concept and how parent-child relationships are stored.
    - Insert/find: O(n) in the worst case, O(h) on a balanced tree-like structure.
    """

    def __init__(self):
        self.root: Optional[TreeNode] = None

    def add_node(self, name: str, node_type: str = "branch", parent_name: Optional[str] = None):
        if not name.strip():
            raise ValueError("Name is required.")
        if self.root is None:
            if parent_name is not None and parent_name.strip():
                raise ValueError("Root node cannot have a parent.")
            self.root = TreeNode(name.strip(), node_type)
            return self.root

        if parent_name is None or not parent_name.strip():
            parent = self.root
        else:
            parent = self.find_node(parent_name.strip())

        if parent is None:
            raise ValueError("Parent node not found.")
        if parent is None:
            raise ValueError("Parent node not found.")
        child = TreeNode(name.strip(), node_type)
        parent.add_child(child)
        return child

    def find_node(self, name: str) -> Optional[TreeNode]:
        if self.root is None:
            return None
        stack = [self.root]
        while stack:
            current = stack.pop()
            if current.name.lower() == name.lower():
                return current
            stack.extend(reversed(current.children))
        return None


class CustomerGraph:
    """Adjacency-list graph for customer transfer relationships.
    Purpose: model how customers are connected in a money-transfer network.
    This demonstrates the Graph concept and BFS/DFS traversal for finding connected customers.
    - Add connection: O(1) average-case
    - BFS/DFS traversal: O(V + E)
    """

    def __init__(self):
        self.adjacency: dict[str, set[str]] = {}

    def add_connection(self, source: str, target: str):
        source_name = source.strip()
        target_name = target.strip()
        if not source_name or not target_name:
            raise ValueError("Both customer names are required.")
        self.adjacency.setdefault(source_name, set()).add(target_name)
        self.adjacency.setdefault(target_name, set()).add(source_name)

    def get_connected_nodes(self, start: str) -> List[str]:
        if not start.strip():
            raise ValueError("Start customer is required.")
        start_name = start.strip()
        if start_name not in self.adjacency:
            self.adjacency.setdefault(start_name, set())

        visited = {start_name}
        queue = deque([start_name])
        connected: List[str] = []
        while queue:
            current = queue.popleft()
            for neighbor in self.adjacency[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    connected.append(neighbor)
        return connected


class UrgentTransaction:
    def __init__(self, description: str, priority: int):
        self.description = description
        self.priority = priority


class PriorityHeap:
    """Min-heap wrapper used to process urgent work by highest priority.
    Purpose: manage urgent transactions so the most important item is handled first.
    This demonstrates the Heap data structure and priority-based processing.
    - Push/pop: O(log n)
    """

    def __init__(self):
        self._heap: List[tuple[int, int, str, int]] = []
        self._counter = 0

    def add(self, description: str, priority: int):
        if not description.strip():
            raise ValueError("Description is required.")
        self._counter += 1
        heapq.heappush(self._heap, (-priority, self._counter, description.strip(), priority))

    def pop_highest(self) -> Optional[UrgentTransaction]:
        if not self._heap:
            return None
        _, _, description, priority = heapq.heappop(self._heap)
        return UrgentTransaction(description, priority)


class BSTNode:
    def __init__(self, account_number: str, account):
        self.account_number = account_number
        self.account = account
        self.left: Optional["BSTNode"] = None
        self.right: Optional["BSTNode"] = None


class AccountBST:
    """Binary search tree for account-number lookup.
    Purpose: store accounts in a searchable structure so account numbers can be found quickly.
    This demonstrates the BST concept and searching by key.
    - Insert/search: O(h), where h is tree height; worst case O(n)
    """

    def __init__(self):
        self.root: Optional[BSTNode] = None

    def insert(self, account_number: str, account):
        if self.root is None:
            self.root = BSTNode(account_number, account)
            return

        current = self.root
        while True:
            if account_number < current.account_number:
                if current.left is None:
                    current.left = BSTNode(account_number, account)
                    return
                current = current.left
            else:
                if current.right is None:
                    current.right = BSTNode(account_number, account)
                    return
                current = current.right

    def search(self, account_number: str) -> Optional[object]:
        current = self.root
        while current is not None:
            if account_number == current.account_number:
                return current.account
            if account_number < current.account_number:
                current = current.left
            else:
                current = current.right
        return None


class Command(ABC):
    # Command pattern base class.
    # Purpose: wrap actions like deposit or withdraw so they can be executed and undone later.
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

    def __repr__(self):
        return f"DepositCommand(account={self.account_number}, amount={self.amount})"

    def execute(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
        acct.deposit(self.amount)

    def undo(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
        acct.withdraw(self.amount)


class WithdrawCommand(Command):
    def __init__(self, account_number: str, amount: float):
        self.account_number = account_number
        self.amount = amount

    def __repr__(self):
        return f"WithdrawCommand(account={self.account_number}, amount={self.amount})"

    def execute(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
        acct.withdraw(self.amount)

    def undo(self, service: 'BankService'):
        acct = service.find_account(self.account_number)
        if acct is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
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
    # Purpose: keep the program organized by moving core operations into one class.
    # This also shows how multiple concepts (OOP, data structures, and design patterns) can be combined.
    """Service layer using a dictionary for accounts and a stack for transaction history.

    Data structure choices and time complexity:
    - accounts: dict[str, Account] for O(1) average-case lookup/insertion/removal.
    - history: Stack for O(1) push/pop to support undo.
    """

    def __init__(self):
        # Dictionary mapping account number -> Account (O(1) average ops)
        self.accounts: dict[str, Account] = AccountRegistry()
        self._config = BankConfig.get_instance()
        # Stack to record transactions for undo support (LIFO)
        self.history = Stack()
        self.transactions: List[Transaction] = []
        self.branch_tree = BranchTree()
        self.customer_graph = CustomerGraph()
        self.priority_heap = PriorityHeap()
        self.account_bst = AccountBST()

    def _rebuild_account_bst(self):
        # O(n) to rebuild the BST after account changes.
        self.account_bst = AccountBST()
        for number, account in self.accounts.items():
            self.account_bst.insert(number, account)

    def add_branch(self, name: str, parent_name: Optional[str] = None):
        # O(n) worst-case traversal to find the parent in the branch tree.
        return self.branch_tree.add_node(name, "branch", parent_name)

    def add_employee(self, name: str, parent_name: Optional[str] = None):
        # O(n) worst-case traversal to find the parent in the branch tree.
        return self.branch_tree.add_node(name, "employee", parent_name)

    def add_transfer_connection(self, source: str, target: str):
        # O(1) average-case adjacency insertion for each new connection.
        self.customer_graph.add_connection(source, target)

    def get_connected_customers(self, start: str) -> List[str]:
        # O(V + E) for breadth-first traversal over the transfer graph.
        return self.customer_graph.get_connected_nodes(start)

    def add_urgent_transaction(self, description: str, priority: int):
        # O(log n) to insert into the priority heap.
        self.priority_heap.add(description, priority)

    def process_highest_priority_transaction(self) -> Optional[UrgentTransaction]:
        # O(log n) to remove the highest-priority item from the heap.
        return self.priority_heap.pop_highest()

    def search_account_in_bst(self, number: str):
        # O(h) lookup in the binary search tree; worst case O(n).
        return self.account_bst.search(number)

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
        self._rebuild_account_bst()
        return account

    def deposit(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
        # Use Command pattern: create, execute, and record command
        cmd = DepositCommand(number, amount)
        cmd.execute(self)
        self.history.push(cmd)

    def withdraw(self, number, amount):
        account = self.find_account(number)
        if account is None:
            raise ValueError(ACCOUNT_NOT_FOUND_MESSAGE)
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

    def add_transaction(self, amount: float, date: str, txn_type: str):
        if amount <= 0:
            raise ValueError("Transaction amount must be positive.")
        if not date.strip():
            raise ValueError("Date is required.")
        normalized_type = txn_type.strip().lower()
        if normalized_type not in {"deposit", "withdraw"}:
            raise ValueError("Transaction type must be deposit or withdraw.")
        self.transactions.append(Transaction(amount=amount, date=date.strip(), type=normalized_type))

    def calculate_total_balance(self) -> float:
        def recurse(index: int) -> float:
            if index >= len(self.transactions):
                return 0.0
            txn = self.transactions[index]
            delta = txn.amount if txn.type == "deposit" else -txn.amount
            return delta + recurse(index + 1)

        return recurse(0)

    def sort_transactions(self, field: str = "amount") -> List[Transaction]:
        if field not in {"amount", "date"}:
            raise ValueError(INVALID_FIELD_MESSAGE)

        def merge_sort(items: List[Transaction]) -> List[Transaction]:
            if len(items) <= 1:
                return items
            middle = len(items) // 2
            left = merge_sort(items[:middle])
            right = merge_sort(items[middle:])
            return merge(left, right, field)

        def merge(left: List[Transaction], right: List[Transaction], sort_field: str) -> List[Transaction]:
            merged: List[Transaction] = []
            left_index = right_index = 0
            while left_index < len(left) and right_index < len(right):
                left_value = getattr(left[left_index], sort_field)
                right_value = getattr(right[right_index], sort_field)
                if left_value <= right_value:
                    merged.append(left[left_index])
                    left_index += 1
                else:
                    merged.append(right[right_index])
                    right_index += 1
            merged.extend(left[left_index:])
            merged.extend(right[right_index:])
            return merged

        return merge_sort(self.transactions[:])

    def linear_search_transaction(self, value: float, field: str = "amount") -> Optional[Transaction]:
        if field not in {"amount", "date"}:
            raise ValueError(INVALID_FIELD_MESSAGE)
        for transaction in self.transactions:
            if getattr(transaction, field) == value:
                return transaction
        return None

    def binary_search_transaction(self, value: float, transactions: List[Transaction], field: str = "amount") -> Optional[Transaction]:
        if field not in {"amount", "date"}:
            raise ValueError(INVALID_FIELD_MESSAGE)

        def recurse(left: int, right: int) -> Optional[Transaction]:
            if left > right:
                return None
            middle = (left + right) // 2
            current = transactions[middle]
            current_value = getattr(current, field)
            if current_value == value:
                return current
            if value < current_value:
                return recurse(left, middle - 1)
            return recurse(middle + 1, right)

        return recurse(0, len(transactions) - 1)

    def generate_report_above_threshold(self, threshold: float) -> List[str]:
        def recurse(index: int, report: List[str]) -> List[str]:
            if index >= len(self.transactions):
                return report
            transaction = self.transactions[index]
            if transaction.amount > threshold:
                report.append(f"{transaction.date}: {transaction.type} -> {transaction.amount}")
            return recurse(index + 1, report)

        return recurse(0, [])

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


def handle_make_transaction(service):
    number = input(ACCOUNT_NUMBER_PROMPT).strip()
    acct = service.find_account(number)
    if acct is None:
        print(ACCOUNT_NOT_FOUND_MESSAGE)
        return None

    action = input("Action (deposit/withdraw): ").strip().lower()
    amount = get_float("Amount: ")
    action_handlers = {
        "deposit": lambda: service.deposit(number, amount),
        "withdraw": lambda: service.withdraw(number, amount),
    }
    handler = action_handlers.get(action)
    if handler is None:
        print("Unknown action")
        return None
    handler()
    return None


def handle_undo_transaction(service):
    txn = service.undo_last_transaction()
    if txn is None:
        print("No transactions to undo.")
    else:
        print(f"Reverted  last transaction for account {txn.account_number}.")
    return False


def handle_search_account(service):
    number = input(ACCOUNT_NUMBER_PROMPT).strip()
    account = service.find_account(number)
    if account is None:
        print(ACCOUNT_NOT_FOUND_MESSAGE)
    else:
        account.statement()
    return False


def handle_create_account(service):
    owner = input("Owner: ").strip()
    number = input(ACCOUNT_NUMBER_PROMPT).strip()
    acct_type = input("Type (savings/current/fixed): ").strip().lower()
    balance = get_float("Initial Balance: ")
    account = service.create_account(acct_type, owner, number, balance)
    print(f"Account {account.number} created.")
    return False


def handle_show_accounts(service):
    all_accts = service.show_all_accounts()
    if not all_accts:
        print("No accounts.")
    else:
        for account in all_accts:
            account.statement()
    return False


def handle_apply_interest(service):
    service.apply_interest_to_all()
    print("Interest applied.")
    return False


def handle_update_bank_rules(service):
    config = BankConfig.get_instance()
    config.interest_rate = get_float("New interest rate (e.g. 0.08): ", default=config.interest_rate)
    config.overdraft_limit = get_float("New overdraft limit: ", default=config.overdraft_limit)
    config.large_withdrawal_threshold = get_float("Large withdrawal threshold: ", default=config.large_withdrawal_threshold)
    print("Bank rules updated.")
    return False


def handle_exit(service):
    print("Thank you for using Addis Bank.")
    return True


def handle_transaction_choice(service, choice):
    handlers = {
        "1": handle_make_transaction,
        "2": handle_undo_transaction,
        "3": handle_search_account,
        "4": handle_create_account,
        "5": handle_show_accounts,
        "6": handle_apply_interest,
        "7": handle_update_bank_rules,
        "8": lambda svc: (run_network_menu(svc), False)[1],
        "9": lambda svc: (run_analyzer_menu(svc), False)[1],
        "0": handle_exit,
    }
    handler = handlers.get(choice)
    if handler is None:
        print(INVALID_OPTION_MESSAGE)
        return False
    return handler(service)


def handle_add_branch_or_employee(service):
    entity_type = input("Add (branch/employee): ").strip().lower()
    name = input("Name: ").strip()
    parent_name = input("Parent name (leave empty for root): ").strip() or None
    if entity_type == "branch":
        service.add_branch(name, parent_name)
        print("Branch added.")
    elif entity_type == "employee":
        service.add_employee(name, parent_name)
        print("Employee added.")
    else:
        print("Invalid entity type.")


def handle_add_transfer_connection(service):
    source = input("From customer: ").strip()
    target = input("To customer: ").strip()
    service.add_transfer_connection(source, target)
    print("Transfer connection added.")


def handle_show_connected_customers(service):
    customer = input("Start customer: ").strip()
    connected = service.get_connected_customers(customer)
    if connected:
        print("Connected customers:", ", ".join(connected))
    else:
        print("No connected customers found.")


def handle_add_urgent_transaction(service):
    description = input("Transaction description: ").strip()
    priority = get_int("Priority (higher number = higher priority): ")
    service.add_urgent_transaction(description, priority)
    print("Urgent transaction added.")


def handle_process_highest_priority(service):
    txn = service.process_highest_priority_transaction()
    if txn is None:
        print("No urgent transactions pending.")
    else:
        print(f"Processed: {txn.description} (priority {txn.priority})")


def handle_search_bst_account(service):
    number = input("Account number: ").strip()
    account = service.search_account_in_bst(number)
    if account is None:
        print(ACCOUNT_NOT_FOUND_MESSAGE)
    else:
        account.statement()


def run_network_menu(service):
    while True:
        print("\n===== ADDIS BANK NETWORK & PRIORITY SYSTEM =====")
        print("1. Add new branch / employee (Tree)")
        print("2. Add money transfer connection (Graph)")
        print("3. Show all connected customers using BFS/DFS")
        print("4. Add urgent transaction (Heap)")
        print("5. Process highest priority transaction")
        print("6. Search for customer account in BST")
        print("0. Back")
        network_choice = input(CHOOSE_OPTION_PROMPT).strip()
        handlers = {
            "1": handle_add_branch_or_employee,
            "2": handle_add_transfer_connection,
            "3": handle_show_connected_customers,
            "4": handle_add_urgent_transaction,
            "5": handle_process_highest_priority,
            "6": handle_search_bst_account,
        }
        if network_choice == "0":
            break
        handler = handlers.get(network_choice)
        if handler is None:
            print(INVALID_OPTION_MESSAGE)
            continue
        handler(service)


def handle_add_transaction(service):
    amount = get_float("Amount: ")
    date = input("Date (YYYY-MM-DD): ").strip()
    txn_type = input("Type (deposit/withdraw): ").strip()
    service.add_transaction(amount, date, txn_type)
    print("Transaction added.")


def handle_show_total_balance(service):
    print(f"Total balance: {service.calculate_total_balance()}")


def handle_sort_transactions(service):
    field = input("Sort by (amount/date): ").strip().lower()
    sorted_transactions = service.sort_transactions(field)
    print("Sorted transactions:")
    for txn in sorted_transactions:
        print(f"- {txn.date} | {txn.type} | {txn.amount}")


def handle_search_transaction(service):
    value = get_float("Value to search: ")
    field = input("Search field (amount/date): ").strip().lower()
    result = service.linear_search_transaction(value, field)
    print("Linear search result:", result)
    sorted_transactions = service.sort_transactions(field)
    result = service.binary_search_transaction(value, sorted_transactions, field)
    print("Binary search result:", result)


def handle_generate_report(service):
    threshold = get_float("Threshold: ")
    report = service.generate_report_above_threshold(threshold)
    if report:
        print("Transactions above threshold:")
        for line in report:
            print(line)
    else:
        print("No transactions above the threshold.")


def run_analyzer_menu(service):
    while True:
        print("\n===== BANK TRANSACTION ANALYZER =====")
        print("1. Add transaction")
        print("2. Show total balance")
        print("3. Sort transactions")
        print("4. Search transaction")
        print("5. Generate report above threshold")
        print("0. Back")
        analyzer_choice = input(CHOOSE_OPTION_PROMPT).strip()
        handlers = {
            "1": handle_add_transaction,
            "2": handle_show_total_balance,
            "3": handle_sort_transactions,
            "4": handle_search_transaction,
            "5": handle_generate_report,
        }
        if analyzer_choice == "0":
            break
        handler = handlers.get(analyzer_choice)
        if handler is None:
            print(INVALID_OPTION_MESSAGE)
            continue
        handler(service)


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
        print("8. Addis Bank Network & Priority System")
        print("9. Bank Transaction Analyzer")
        print("0. Exit")

        choice = input(CHOOSE_OPTION_PROMPT)

        try:
            should_exit = handle_transaction_choice(service, choice)
            if should_exit:
                break
        except ValueError as error:
            print(f"Error: {error}")


if __name__ == "__main__":
    main()
