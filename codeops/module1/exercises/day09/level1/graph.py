class Graph:
    def __init__(self):
        self.graph = {}

    def add_customer(self, customer):
        if customer not in self.graph:
            self.graph[customer] = []

    def add_transfer(self, customer1, customer2):
        self.add_customer(customer1)
        self.add_customer(customer2)
        self.graph[customer1].append(customer2)
        self.graph[customer2].append(customer1)

    def print_graph(self):
        for customer, transfers in self.graph.items():
            print(f"{customer}: {', '.join(transfers)}")


if __name__ == "__main__":
    graph = Graph()
    customers = ["Almaz", "Dawit", "Tigist", "Hanna"]

    for customer in customers:
        graph.add_customer(customer)

    graph.add_transfer("Almaz", "Dawit")
    graph.add_transfer("Almaz", "Tigist")
    graph.add_transfer("Dawit", "Hanna")
    graph.add_transfer("Tigist", "Hanna")

    graph.print_graph()

