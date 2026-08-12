# 3. Observer Pattern  
# Implement a simple Observer system in the Account class. When withdraw() is 
# called with amount > 3000, it should notify SMSAlert and AuditLog classes.

from abc import ABC, abstractmethod

# Observer interface
class IObserver(ABC):
    @abstractmethod
    def update(self, account_id: str, event_type: str, details: str):
        pass

# Concrete Observers
class SMSAlert(IObserver):
    def update(self, account_id: str, event_type: str, details: str):
        if event_type == "LARGE_WITHDRAWAL":
            print(f"[SMS ALERT] Account {account_id}: {details}")

class AuditLog(IObserver):
    def update(self, account_id: str, event_type: str, details: str):
        print(f"[AUDIT LOG] Logged event '{event_type}' for account {account_id}: {details}")

# Subject / Observable
class Account:
    def __init__(self, account_id: str, balance: float):
        self.account_id = account_id
        self.balance = balance
        self._observers = []

    def attach(self, observer: IObserver):
        self._observers.append(observer)

    def detach(self, observer: IObserver):
        self._observers.remove(observer)

    def notify_all(self, event_type: str, details: str):
        for observer in self._observers:
            observer.update(self.account_id, event_type, details)

    def withdraw(self, amount: float):
        if amount > self.balance:
            print("Insufficient funds.")
            return

        self.balance -= amount
        print(f"Withdrew {amount}. Remaining balance: {self.balance}")
        
        # Trigger observers if condition is met
        if amount > 3000:
            self.notify_all("LARGE_WITHDRAWAL", f"Withdrawal of {amount} exceeded threshold.")

# Usage
if __name__ == "__main__":
    account = Account("ACC-999", 10000)
    
    # Register observers
    sms_alert = SMSAlert()
    audit_log = AuditLog()
    
    account.attach(sms_alert)
    account.attach(audit_log)
    
    # Normal withdrawal (no alerts)
    print("--- Normal Withdrawal ---")
    account.withdraw(1000)
    
    # Large withdrawal (triggers alerts)
    print("\n--- Large Withdrawal ---")
    account.withdraw(5000)
