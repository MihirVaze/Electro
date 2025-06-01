import { SchemaName } from '../../../utility/umzug-migration';
import { ConsumptionSchema } from '../../consumption/consumption.schema';
import customerBillRepo from './customerBill.repo';
import { CustomerBill } from './customerBill.type';
import { CustomerSchema } from '../../customer/customer.schema';
import { CUSTOMER_BILL_RESPONSES } from './customerBill.response';
import consumptionService from '../../consumption/consumption.service';
import { CONSUMPTION_RESPONSES } from '../../consumption/consumption.response';
import customerService from '../../customer/customer.service';
import meterService from '../../meter/meter.service';
import { sendEmail } from '../../../utility/sendmail';
import userService from '../../user/user.service';

class CustomerBillService {
    async generateCustomerBill(schema: SchemaName) {
        try {
            const consumptionForTheMonth =
                await consumptionService.getConsumptionForBillingCycle(schema);
            if (consumptionForTheMonth.count === 0)
                throw CONSUMPTION_RESPONSES.CONSUMPTION_NOT_FOUND;

            const newBillEntries: any[] = [];
            const billData: any[] = [];

            for (const consumption of consumptionForTheMonth.rows) {
                const consumptionDetails =
                    await consumptionService.getOneConsumption(
                        consumption.dataValues.id ?? '',
                        schema,
                    );
                const customerMeterId =
                    consumptionDetails.dataValues.customerMeterId ?? '';
                const customerMeter = (
                    await customerService.getCustomerMeter(
                        { id: customerMeterId },
                        schema,
                    )
                ).dataValues;
                const getMeterDetails = await meterService.findOneMeter(
                    { id: customerMeter.id },
                    schema,
                );
                const getCustomerDetails = (
                    await customerService.getCustomer(
                        { userId: customerMeter.userId },
                        schema,
                    )
                ).dataValues;

                const userDetails = await userService.getOneUser(
                    { id: getCustomerDetails.userId },
                    schema,
                );

                const bill = {
                    customerMeterId: consumption.dataValues.customerMeterId,
                    basePrice: getMeterDetails.basePrice,
                    perUnitCost: getMeterDetails.pricePerUnit,
                    consumptionId: consumption.dataValues.id,
                    total:
                        getMeterDetails.basePrice +
                        getMeterDetails.pricePerUnit *
                            consumption.dataValues.unitsUsed,
                    billingDate: new Date(),
                    status: 'unpaid',
                };

                newBillEntries.push(bill);
                billData.push({
                    email: userDetails?.dataValues.email,
                    meterId: customerMeter.id,
                    customerMeterId,
                    unitsUsed: consumption.dataValues.unitsUsed,
                    total:
                        getMeterDetails.basePrice +
                        getMeterDetails.pricePerUnit *
                            consumption.dataValues.unitsUsed,
                    billingDate: new Date(),
                    dueDate: new Date(
                        new Date().setDate(new Date().getDate() + 15),
                    ),
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
                billingDate,
                customerMeterId,
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

                        <p><strong>Meter ID:</strong> ${customerMeterId}</p>
                        <p><strong>Units Used:</strong> ${unitsUsed}</p>
                        <p><strong>Total Amount:</strong> ${total}</p>
                        <p><strong>Billing Date:</strong> ${billingDate}</p>
                        <p><strong>Due Date:</strong> ${dueDate}</p>
                    </body>

                </html>`,
                );
            }
            return result;
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
                            model: ConsumptionSchema,
                            include: [
                                {
                                    model: CustomerSchema,
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
        offset: number,
        schema: SchemaName,
    ) {
        try {
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
                            model: ConsumptionSchema,
                            include: [
                                {
                                    model: CustomerSchema,
                                },
                            ],
                        },
                    ],
                    limit,
                    offset,
                },
                schema,
            );
            if (result.count === 0)
                throw CUSTOMER_BILL_RESPONSES.BILL_NOT_FOUND;

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

    async deleteBill(billId: string, schema: SchemaName) {
        try {
            const result = await customerBillRepo.delete(
                { where: { id: billId } },
                schema,
            );
            if (!result[0]) throw CUSTOMER_BILL_RESPONSES.BILL_DELETION_FAILED;

            return CUSTOMER_BILL_RESPONSES.BILL_DELETED;
        } catch (e) {
            console.dir(e);
            throw e;
        }
    }
}

export default new CustomerBillService();
