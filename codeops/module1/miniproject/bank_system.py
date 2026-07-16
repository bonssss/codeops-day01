#  create  miniproject for bank system

class BankAccount:
    def __init__(self, account_number, account_holder, balance=0,):
        self.account_number = account_number
        self.account_holder = account_holder
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited: ${amount}. New balance: ${self.__balance}")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrew: ${amount}. New balance: ${self.__balance}")
        else:
            print("Insufficient funds or invalid withdrawal amount.")
    def statement(self):
        print(f"Account Number: {self.account_number}")
        print(f"Account Holder: {self.account_holder}")
        print(f"Balance: ${self.__balance}")
    
    @property
    def balance(self):
        return self.__balance
abe=BankAccount("123456789", "Bonsa", 1000)
abe.deposit(500)
abe.withdraw(200)
abe.statement()
abe.withdraw(2000)  # Attempt to withdraw more than the balance
abe.deposit(-100)  # Attempt to deposit a negative amount
print(f"Current balance: ${abe.balance}")
    