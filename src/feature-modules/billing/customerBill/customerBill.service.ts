import { SchemaName } from '../../../utility/umzug-migration';
import customerBillRepo from './customerBill.repo';
import { BillData, CustomerBill } from './customerBill.type';
import { CustomerMeterSchema } from '../../customer/customer.schema';
import { CUSTOMER_BILL_RESPONSES } from './customerBill.response';
import consumptionService from '../../consumption/consumption.service';
import { CONSUMPTION_RESPONSES } from '../../consumption/consumption.response';
import { sendEmail } from '../../../utility/sendmail';
import { UserSchema } from '../../user/user.schema';
import { Op } from 'sequelize';

class CustomerBillService {
    async generateCustomerBill(userId: string, schema: SchemaName) {
        try {
            const consumptionForTheMonth =
                await consumptionService.getConsumptionForBillingCycle(schema);
            console.dir(consumptionForTheMonth);
            if (consumptionForTheMonth.count === 0)
                throw CONSUMPTION_RESPONSES.CONSUMPTION_NOT_FOUND;

            const newBillEntries: CustomerBill[] = [];
            const billData: BillData[] = [];

            for (const consumption of consumptionForTheMonth.rows) {
                const BASE_PRICE =
                    consumption.dataValues.customerMeter?.meter?.basePrice!;
                const PER_UNIT_COST =
                    consumption.dataValues.customerMeter?.meter?.pricePerUnit!;
                const total =
                    Number(BASE_PRICE) +
                    Number(PER_UNIT_COST) *
                        Number(consumption.dataValues.unitsUsed);
                const bill = {
                    customerMeterId: consumption.dataValues.customerMeterId,
                    basePrice: BASE_PRICE,
                    perUnitCost: PER_UNIT_COST,
                    consumptionId: consumption.dataValues.id,
                    total,
                    billingDate: new Date(),
                    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                    status: 'unpaid',
                    createdBy: userId,
                };

                newBillEntries.push(bill);
                billData.push({
                    email:
                        consumption.dataValues.customerMeter?.user?.email ?? '',
                    meter:
                        consumption.dataValues.customerMeter?.meterName ?? '',
                    customerMeter: consumption.dataValues.customerMeter!,
                    unitsUsed: consumption.dataValues.unitsUsed,
                    total,
                    billingDate: new Date(),
                    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                });
            }

            const result = await customerBillRepo.create(
                newBillEntries,
                schema,
            );
            if (!result) throw CUSTOMER_BILL_RESPONSES.BILL_CREATION_FAILED;

            for (const {
                email,
                total,
                meter,
                billingDate,
                customerMeter,
                unitsUsed,
                dueDate,
            } of billData) {
                sendEmail(
                    email,
                    'Monthly Electricity Bill',
                    `<!DOCTYPE html>
                    <html>

                    <head>
                        <title>Monthly Electricity Bill </title>
                    </head>

                    <body>
                        <p>Here is your electricity bill for this month:</p>
                        <p><strong>CustomerMeter:</strong> ${customerMeter}</p>
                        <p><strong>Meter:</strong> ${meter}</p>
                        <p><strong>Units Used:</strong> ${unitsUsed}</p>
                        <p><strong>Total Amount:</strong> ${total}</p>
                        <p><strong>Billing Date:</strong> ${billingDate}</p>
                        <p><strong>Due Date:</strong> ${dueDate}</p>
                    </body>

                </html>`,
                );
            }
            return CUSTOMER_BILL_RESPONSES.BILL_CREATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getCustomerBill(
        customerBill: Partial<CustomerBill>,
        schema: SchemaName,
    ) {
        try {
            const result = await customerBillRepo.getOne(
                {
                    where: customerBill,
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: CustomerMeterSchema.schema(schema),
                            as: 'customerMeter',
                            attributes: {
                                exclude: [
                                    'isDeleted',
                                    'deletedBy',
                                    'deletedAt',
                                    'restoredBy',
                                    'restoredAt',
                                    'createdBy',
                                    'updatedBy',
                                ],
                            },
                            include: [
                                {
                                    model: UserSchema.schema(schema),
                                    as: 'user',
                                    attributes: {
                                        exclude: [
                                            'password',
                                            'isDeleted',
                                            'deletedBy',
                                            'deletedAt',
                                            'restoredBy',
                                            'restoredAt',
                                            'createdBy',
                                            'updatedBy',
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
                schema,
            );
            if (!result) throw CUSTOMER_BILL_RESPONSES.BILL_NOT_FOUND;

            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async getAllBills(
        customerBill: Partial<CustomerBill>,
        limit: number,
        page: number,
        schema: SchemaName,
    ) {
        try {
            let where: any = {};

            let customerWhere: any = {};

            const { startDate, endDate, customer } = customerBill;

            if (customer?.name) {
                customerWhere.name = { [Op.iLike]: `%${customer?.name}%` };
            }

            if (customer?.email) {
                customerWhere.email = { [Op.iLike]: `%${customer?.email}%` };
            }

            if (startDate && endDate) {
                where.billingDate = { [Op.between]: [startDate, endDate] };
            }

            if (startDate) {
                where.billingDate = { [Op.lte]: [startDate] };
            }

            if (endDate) {
                where.billingDate = { [Op.gte]: [endDate] };
            }

            const offset = (page - 1) * limit;

            const result = await customerBillRepo.getAll(
                {
                    where: customerBill,
                    attributes: {
                        exclude: [
                            'isDeleted',
                            'deletedBy',
                            'deletedAt',
                            'restoredBy',
                            'restoredAt',
                            'createdBy',
                            'updatedBy',
                        ],
                    },
                    include: [
                        {
                            model: CustomerMeterSchema.schema(schema),
                            where: customerWhere,
                            as: 'customerMeter',
                            attributes: {
                                exclude: [
                                    'isDeleted',
                                    'deletedBy',
                                    'deletedAt',
                                    'restoredBy',
                                    'restoredAt',
                                    'createdBy',
                                    'updatedBy',
                                ],
                            },
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );
            if (!result.count) throw CUSTOMER_BILL_RESPONSES.BILL_NOT_FOUND;

            return result;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async updateBillStatus(
        customerBill: Partial<CustomerBill>,
        billId: string,
        schema: SchemaName,
    ) {
        try {
            const result = await customerBillRepo.update(
                customerBill,
                { where: { id: billId } },
                schema,
            );
            if (!result[0]) throw CUSTOMER_BILL_RESPONSES.BILL_UPDATION_FAILED;

            return CUSTOMER_BILL_RESPONSES.BILL_UPDATED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }

    async deleteBill(
        billId: string,
        customerBill: Partial<CustomerBill>,
        schema: SchemaName,
    ) {
        try {
            const result = await customerBillRepo.delete(
                { where: { id: billId } },
                schema,
            );
            if (!result[0]) throw CUSTOMER_BILL_RESPONSES.BILL_DELETION_FAILED;
            await customerBillRepo.update(
                customerBill,
                { where: { id: billId } },
                schema,
            );
            return CUSTOMER_BILL_RESPONSES.BILL_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new CustomerBillService();
