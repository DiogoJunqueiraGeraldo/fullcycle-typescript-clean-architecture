import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  //

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false, field: "customer_id" })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  //

  @HasMany(() => OrderItemModel)
  declare orderItems: OrderItemModel[];

  @Column({ allowNull: false, field: "total_price" })
  declare totalPrice: number;
}
