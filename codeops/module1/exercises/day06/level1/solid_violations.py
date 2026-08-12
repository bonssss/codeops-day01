# 4. Identify SOLID Violations  
# Look at this code and name which SOLID principle(s) are violated: 
# class Account: 
#     def __init__(self): 
#         self.notifier = EmailNotifier() 
#     def withdraw(self, amount): 
#         self.notifier.send_email(...) 
#         self.save_to_db(...) 

# Violations:
# 1. Single Responsibility Principle (SRP): 
#    The Account class has multiple responsibilities:
#    - Managing the account balance (withdraw logic).
#    - Sending notifications.
#    - Saving data to the database.
#    If the database schema changes or the email format changes, the Account class has to change.

# 2. Dependency Inversion Principle (DIP):
#    The Account class directly instantiates and depends on a concrete class `EmailNotifier` 
#    instead of depending on an abstraction (like an `INotifier` interface). This makes it 
#    hard to switch to a different notification method (e.g., SMSNotifier) without changing the code.

# 3. Open/Closed Principle (OCP):
#    If we want to add a new notification type (e.g., SMS), we have to modify the Account class.
