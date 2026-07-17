# 10. Full Program – Inventory Manager Create a program that: 
# • Uses a dictionary to store product: quantity pair 
# • Menu system with options: 
# 1. Add new product 
# 2. Update quantity 
# 3. View all products 
# 4. Save to file 
# 5. Load from file 
# 6. Exit

def main():
    inventory = {}

    while True:
        print("\nInventory Manager")
        print("1. Add new product")
        print("2. Update quantity")
        print("3. View all products")
        print("4. Save to file")
        print("5. Load from file")
        print("6. Exit")

        choice = input("Enter your choice (1-6): ")

        if choice == '1':
            add_product(inventory)
        elif choice == '2':
            update_quantity(inventory)
        elif choice == '3':
            view_products(inventory)
        elif choice == '4':
            save_to_file(inventory)
        elif choice == '5':
            load_from_file(inventory)
        elif choice == '6':
            print("Exiting the Inventory Manager. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

def add_product(inventory):
    product = input("Enter product name: ")
    if product in inventory:
        print(f"{product} already exists in the inventory.")
    else:
        try:
            quantity = int(input("Enter quantity: "))
            if quantity < 0:
                print("Quantity cannot be negative. Please enter a valid amount.")
                return
            inventory[product] = quantity
            print(f"Added {product} with quantity {quantity}.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")
def update_quantity(inventory):
    product = input("Enter product name to update: ")
    if product in inventory:
        try:
            quantity = int(input("Enter new quantity: "))
            if quantity < 0:
                print("Quantity cannot be negative. Please enter a valid amount.")
                return
            inventory[product] = quantity
            print(f"Updated {product} to quantity {quantity}.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")
    else:
        print(f"{product} does not exist in the inventory.")


def view_products(inventory):
    for item,quantity in inventory.items():
        print(f"{item} has {quantity}")
def save_to_file(inventory):
    try:
        with open("inventory.txt", "w") as file:
            inventory
            for item, quantity in inventory.items():
                file.write(f"{item},{quantity}\n")
    except FileNotFoundError:
        print("Error: File not found.")
    
def load_from_file(inventory):
    try:
        with open("inventory.txt","r") as file:
            for line in file:
                item, quantity = line.strip().split(",")
        print(f"{item},{quantity}")
    except FileNotFoundError:
            print("Error: File not found.")






if __name__ == "__main__":
    main()



    