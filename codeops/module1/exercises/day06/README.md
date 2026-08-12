# Day 6 Exercises: SOLID Principles

This folder contains exercises for Day 6, focusing on Object-Oriented Programming and the SOLID Design Principles.

## Level 1 (Basic)
* **`srp.py`**: Single Responsibility Principle. Refactoring an `Employee` class into separate components.
* **`ocp.py`**: Open/Closed Principle. Refactoring a bonus calculation function using abstract classes and inheritance.
* **`lsp.py`**: Liskov Substitution Principle. Fixing an inheritance design using `Bird` and `Penguin` classes.
* **`solid_violations.py`**: Identifying and explaining SRP, DIP, and OCP violations within an `Account` God Class snippet.

## Level 2 (Intermediate)
* **`srp_dip.py`**: Refactoring the `Account` class to separate concerns. Moves persistence and notification into their own classes using Dependency Injection (DIP).
* **`factory_pattern.py`**: Implementing an `AccountFactory` class to handle the creation of multiple account types (`SavingsAccount`, `CurrentAccount`, `FixedDepositAccount`).
* **`observer_pattern.py`**: Implementing the Observer design pattern where the `Account` acts as a Subject and alerts `SMSAlert` and `AuditLog` Observers during large withdrawals.
* **`isp.py`**: Applying the Interface Segregation Principle by creating an `InterestBearing` abstract base class specifically for the `SavingsAccount`, keeping `CurrentAccount` clean.

## Level 3 (Advanced)
* **`full_solid.py`**: A comprehensive refactoring of an `Account` God Class, utilizing multiple SOLID principles at once.
* **`factory_observer_singleton.py`**: A combination of 3 design patterns: Singleton (`BankConfig`), Factory (`AccountFactory`), and the Observer pattern for transaction alerts.
* **`refactoring_challenge.py`**: Extending the existing architecture by adding a new `InvestmentAccount`. It highlights how the Open/Closed Principle combined with the Factory Pattern makes scaling seamless without mutating existing core code.
