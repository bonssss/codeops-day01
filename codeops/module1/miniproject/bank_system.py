from abc import ABC, abstractmethod


# ==========================
# Input Helpers
# ==========================

def get_float(message, default=None):
    while True:
        try:
            value = input(message)

            if value == "" and default is not None:
                return default

            return float(value)

        except ValueError:
            print("Invalid input. Please enter a number.")



def get_int(message):
    while True:
        try:
            return int(input(message))

        except ValueError:
            print("Invalid input. Please enter an integer.")



# ==========================
# Abstract Account Class
# ==========================

class Account(ABC):

    def __init__(self, owner, number, balance=0):

        self.owner = owner
        self.number = number
        self.__balance = balance


    @property
    def balance(self):

        return self.__balance


    @balance.setter
    def balance(self, amount):

        if amount >= 0:
            self.__balance = amount

        else:
            print("Balance cannot be negative.")



    def deposit(self, amount):

        if amount > 0:

            self.__balance += amount

            print(
                f"Deposited {amount}"
            )

        else:

            print(
                "Deposit must be positive."
            )



    def withdraw(self, amount):

        if amount <= 0:

            print(
                "Invalid amount."
            )

        elif amount > self.__balance:

            print(
                "Insufficient balance."
            )

        else:

            self.__balance -= amount

            print(
                f"Withdrawn {amount}"
            )



    def statement(self):

        print("--------------------------")
        print(
            "Account Type:",
            self.__class__.__name__
        )
        print(
            "Account No:",
            self.number
        )
        print(
            "Owner:",
            self.owner
        )
        print(
            "Balance:",
            self.balance
        )


    @abstractmethod
    def calculate_interest(self):
        pass




# ==========================
# Savings Account
# ==========================

class SavingsAccount(Account):

    def __init__(
            self,
            owner,
            number,
            balance,
            rate=0.10
    ):

        super().__init__(
            owner,
            number,
            balance
        )

        self.rate = rate



    def calculate_interest(self):

        return self.balance * self.rate



    def add_interest(self):

        interest = self.calculate_interest()

        self.balance = self.balance + interest

        print(
            f"Interest added: {interest}"
        )



    def statement(self):

        super().statement()

        print(
            f"Interest Rate: {self.rate * 100}%"
        )




# ==========================
# Current Account
# ==========================

class CurrentAccount(Account):

    def __init__(
            self,
            owner,
            number,
            balance,
            overdraft_limit=1000
    ):

        super().__init__(
            owner,
            number,
            balance
        )

        self.overdraft_limit = overdraft_limit



    def withdraw(self, amount):

        if amount <= 0:

            print(
                "Invalid amount."
            )

        elif amount > self.balance + self.overdraft_limit:

            print(
                "Overdraft limit exceeded."
            )

        else:

            self.balance = self.balance - amount

            print(
                f"Withdrawn {amount}"
            )



    def calculate_interest(self):

        return 0



    def statement(self):

        super().statement()

        print(
            "Overdraft Limit:",
            self.overdraft_limit
        )




# ==========================
# Fixed Deposit Account
# ==========================

class FixedDepositAccount(SavingsAccount):

    def __init__(
            self,
            owner,
            number,
            balance,
            rate,
            years
    ):

        super().__init__(
            owner,
            number,
            balance,
            rate
        )

        self.years = years



    def statement(self):

        super().statement()

        print(
            "Fixed Period:",
            self.years,
            "years"
        )




# ==========================
# Bank Storage
# ==========================

accounts = []



def find_account(number):

    for account in accounts:

        if account.number == number:

            return account

    return None




# ==========================
# Main Program
# ==========================

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
    print("0. Exit")


    choice = input(
        "Choose option: "
    )



    # Create Savings

    if choice == "1":

        owner = input(
            "Owner: "
        )

        number = input(
            "Account Number: "
        )


        if find_account(number):

            print(
                "Account already exists."
            )

            continue


        balance = get_float(
            "Initial Balance: "
        )


        rate = get_float(
            "Interest Rate (%): ",
            10
        ) / 100



        account = SavingsAccount(
            owner,
            number,
            balance,
            rate
        )


        accounts.append(account)


        print(
            "Savings Account Created."
        )



    # Create Current

    elif choice == "2":


        owner = input(
            "Owner: "
        )

        number = input(
            "Account Number: "
        )


        balance = get_float(
            "Initial Balance: "
        )


        overdraft = get_float(
            "Overdraft Limit: ",
            1000
        )


        accounts.append(

            CurrentAccount(
                owner,
                number,
                balance,
                overdraft
            )

        )


        print(
            "Current Account Created."
        )



    # Fixed Deposit

    elif choice == "3":


        owner = input(
            "Owner: "
        )


        number = input(
            "Account Number: "
        )


        balance = get_float(
            "Initial Balance: "
        )


        rate = get_float(
            "Interest Rate (%): ",
            10
        ) / 100



        years = get_int(
            "Years: "
        )



        accounts.append(

            FixedDepositAccount(
                owner,
                number,
                balance,
                rate,
                years
            )

        )


        print(
            "Fixed Deposit Created."
        )



    # Deposit

    elif choice == "4":


        number = input(
            "Account Number: "
        )


        account = find_account(number)


        if account:

            amount = get_float(
                "Amount: "
            )

            account.deposit(amount)


        else:

            print(
                "Account not found."
            )



    # Withdraw

    elif choice == "5":


        number = input(
            "Account Number: "
        )


        account = find_account(number)


        if account:

            amount = get_float(
                "Amount: "
            )

            account.withdraw(amount)


        else:

            print(
                "Account not found."
            )



    # Statement

    elif choice == "6":


        number = input(
            "Account Number: "
        )


        account = find_account(number)


        if account:

            account.statement()


        else:

            print(
                "Account not found."
            )



    # Apply interest

    elif choice == "7":


        for account in accounts:


            if isinstance(
                account,
                SavingsAccount
            ):

                account.add_interest()



        print(
            "Interest applied."
        )



    # All accounts

    elif choice == "8":


        if not accounts:

            print(
                "No accounts."
            )


        else:

            for account in accounts:

                account.statement()



    elif choice == "0":

        print(
            "Thank you for using Addis Bank."
        )

        break



    else:

        print(
            "Invalid option."
        )