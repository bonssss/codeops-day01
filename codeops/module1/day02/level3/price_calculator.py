# final price calculator 

def calculate_final_price(price, tax_rate=0.15, discount_rate=0):
    tax_amount = price * tax_rate
    discount_amount = price * discount_rate
    final_price = price + tax_amount - discount_amount

    print(f"Price: ${price:.2f}")
    print(f"Tax Rate: {tax_rate * 100:.0f}%")
    print(f"Discount Rate: {discount_rate * 100:.0f}%")
    print(f"Tax Amount: ${tax_amount:.2f}")
    print(f"Discount Amount: ${discount_amount:.2f}")
    print(f"Final Price: ${final_price:.2f}\n")

    return final_price

calculate_final_price(100, 0.10, 0.05)   # 10% tax, 5% discount
calculate_final_price(200, discount_rate=0.20)  # 15% default tax, 20% discount
calculate_final_price(150, 0, 0.10)       # No tax, 10% discount