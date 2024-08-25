import CustomerAdressChangedEvent from "../../customer/event/customer-adress-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLogWhenAdressIsChangedHandler from "../../customer/event/handler/envia-console-log-when-adress-is-changed";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-consolelog1-when-customer-is-created.handler";
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/envia-consolelog2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  //Product

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  //Customer

  it("should register a customer event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister an customer event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should unregister all customer event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all customer event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler();
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      nome: "Joao",
      adress: "Rua 10, numero 30, Centro",
    });

    // Quando o notify for executado, EnviaConsoleLog1WhenCustomerIsCreatedHandler.handle()
    //e EnviaConsoleLog2WhenCustomerIsCreatedHandler.handle() devem ser chamados
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  //Adress

  it("should register a change adress event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogWhenAdressIsChangedHandler();

    eventDispatcher.register("CustomerAdressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister a change adress event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogWhenAdressIsChangedHandler();

    eventDispatcher.register("CustomerAdressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAdressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"].length
    ).toBe(0);
  });

  it("should unregister all change adress event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogWhenAdressIsChangedHandler();

    eventDispatcher.register("CustomerAdressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"]
    ).toBeUndefined();
  });

  it("should notify all change adress event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogWhenAdressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAdressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerAdressChangedEvent = new CustomerAdressChangedEvent({
      id: "1",
      name: "José Pedro",
      address: "Avenida Getulio Varga, número 100, Centro, 37160-000",
    });

    // Quando o notify for executado o EnviaConsoleLogWhenAdressIsChangedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerAdressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
