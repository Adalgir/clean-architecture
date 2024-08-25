import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/orderItem";

let costumer = new Customer("1", "Doe");
const address = new Address("Main St", "Springfield", 10, "12345");
costumer.addAddress(address);
costumer.activate();

const item1 = new OrderItem("1", "Product 1", 100, "1", 2);
const item2 = new OrderItem("2", "Product 2", 200, "1", 2);
const order = new Order("1", "1", [item1, item2]);
