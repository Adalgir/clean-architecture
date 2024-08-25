import { Op } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  /*   async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: { id: entity.id },
      }
    );
  } */

  async update(entity: Order): Promise<void> {
    // Atualiza os campos do pedido (Order)
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    // Para cada item na ordem, faça upsert (atualiza ou cria)
    for (const item of entity.items) {
      await OrderItemModel.upsert({
        id: item.id,
        order_id: entity.id, // Relaciona o item com o pedido
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      });
    }

    // Opcional: remover itens que não estão mais presentes na ordem
    const itemIds = entity.items.map((item) => item.id);
    await OrderItemModel.destroy({
      where: {
        order_id: entity.id,
        id: {
          [Op.notIn]: itemIds,
        },
      },
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [OrderItemModel],
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
}
