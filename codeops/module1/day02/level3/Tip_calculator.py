# simple tip calculator: helper functions and a main runner

def tip_amount(bill, tip_percent):
    return bill * (tip_percent / 100)

def total_bill(bill, tip_percent):
    tip = tip_amount(bill, tip_percent)
    total_amount = bill + tip
    return total_amount

def amount_per_person(total_amount, people):
    return total_amount / people


def calculate_tip(bill, tip_percent, people=None):
    return bill * (tip_percent / 100)


def main():
    bill_amount = float(input("Enter the bill amount: "))
    tip_percentage = float(input("Enter the tip percentage: "))
    number_of_people = int(input("Enter the number of people to split the bill: "))

    print(f"Bill Amount: ${bill_amount:.2f}")
    print(f"Tip Percentage: {tip_percentage}%")
    tip = calculate_tip(bill_amount, tip_percentage, number_of_people)
    print(f"Tip Amount: ${tip:.2f}")
    total = total_bill(bill_amount, tip_percentage)
    print(f"Total Bill Amount: ${total:.2f}")


if __name__ == "__main__":
    main()
