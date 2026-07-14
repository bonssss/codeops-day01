#  personal finance tracker that have menu options
balance=100
def main():
    while True:
        print("Welcome to the Personal Finance Tracker!")
        print("Please choose an option:")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. View Balance")
        print("4. Exit")

        choice = input("Enter your choice (1-4): ")

        if choice == '1':
            add_income()
        elif choice == '2':
            add_expense()
        elif choice == '3':
            view_balance()
        elif choice == '4':
            print("Exiting the Personal Finance Tracker. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
        

        
def add_income():
    global balance
    try:
        income = float(input("Enter the income amount: "))
        if income <= 0:
            print("Income cannot be zero or negative. Please enter a valid amount.")
            return
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return
    balance += income
    print(f"Income of {income} added. New balance: {balance}")
def add_expense():
    global balance
    try:
        expense = float(input("Enter the expense amount: "))
        if expense <= 0:
            print("Expense cannot be zero or negative. Please enter a valid amount.")
            return
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return
    if expense > balance:
        print("Insufficient balance for this expense.")
        
    else:
    
        balance -= expense
        print(f"Expense of {expense} added. New balance: {balance}")
def view_balance():
    print(f"Current balance: {balance}")
if __name__ == "__main__":
    main()

    

