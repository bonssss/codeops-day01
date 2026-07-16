# 7. Modules & Import 
# • Create a file utils.py with these function: 
# o add_tax(price, rate=0.15) – accepts a price, includes tax and returns tax included 
# price 
# • In your main.py file, import and use the function.

def add_tax(price, rate=0.15):
    """
    Calculate the price including tax.

    Parameters:
    price (float): The original price.
    rate (float): The tax rate (default is 0.15).

    Returns:
    float: The price including tax.
    """
    return round(price * (1 + rate), 2)