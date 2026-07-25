# 5. Dictionary Operations 
# • Create a dictionary of 5 products and their prices. 
# • Loop through the dictionary and print each product with its price in an attractive manner. 
# • Ask user for a product name and show its price (use .get() with default message if not 
# found). 

products = {
    "Laptop": 1000,
    "Smartphone": 500,
    "Headphones": 100,
    "Keyboard": 50,
    "Mouse": 30
}

# Loop through the dictionary and print each product with its price
for product, price in products.items():
    print(f"{product}: ${price}")

# Ask user for a product name and show its price
user_input = input("Enter a product name: ")
price = products.get(user_input, "Product not found")
print(f"Price of {user_input}: ${price}")