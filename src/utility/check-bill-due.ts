import clientBillService from '../feature-modules/billing/clientBill/clientBill.service';
import { sendEmail } from './sendmail';
import { createJob } from './scheduler';
import { sequelize } from '../connections/pg.connection';
import customerBillService from '../feature-modules/billing/customerBill/customerBill.service';

export const checkClientBillPaymentDaily = async () => {
    const clientBills = await clientBillService.findAllUnpaidClientBills();
    const currentTime = Date.now();
    for (const clientBill of clientBills.rows) {
        const { dueDate, id } = clientBill.dataValues;
        const clientEmail = clientBill.dataValues.User?.email;
        const clientName = clientBill.dataValues.User?.name?.toUpperCase();

        if (clientEmail) {
            if (currentTime > dueDate.getTime()) {
                sendEmail(
                    clientEmail,
                    `DEAR ${clientName}, BILL IS DUE, POSSIBLE TERMINATION OF ACCOUNT`,
                    `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>UNPAID BILL</title>
                    </head>
                    <body>
                        <p>Dear Client ${clientName} we are about to terminate your account</p>
                        <p> Bill ID:${id} </p>
                        <p> Due Date: ${dueDate} </p>
                        <p> Pay your bills or your services will be stopped </p>
                    </body>
                    </html>`,
                );
            }
        }
    }
};

export const checkForCustomerBillPayment = async () => {
    try {
        const currentTime = Date.now();
        const schemas = await sequelize.showAllSchemas({});
        for (const schema of schemas) {
            if (String(schema) !== 'public') {
                const monthlyUnpaidBills = (
                    await customerBillService.findAllUnpaidBillsForTheMonth(
                        String(schema),
                    )
                ).rows;
                for (const bill of monthlyUnpaidBills) {
                    const { dueDate, id } = bill.dataValues;
                    const customerEmail =
                        bill.dataValues.customerMeter?.user?.email;
                    const customerName =
                        bill.dataValues.customerMeter?.user?.name;
                    if (customerEmail) {
                        if (currentTime > dueDate.getTime()) {
                            sendEmail(
                                customerEmail,
                                `DEAR ${customerName}, BILL IS DUE, POSSIBLE TERMINATION OF ACCOUNT`,
                                `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>UNPAID BILL</title>
                    </head>
                    <body>
                        <p>Dear Client ${customerName} we are about to terminate your account</p>
                        <p> Bill ID:${id} </p>
                        <p> Due Date: ${dueDate} </p>
                        <p> Pay your bills or your services will be stopped </p>
                    </body>
                    </html>`,
                            );
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const checkClientBillPayment = () => {
    createJob('0 0 28 * *', [
        checkClientBillPaymentDaily,
        checkForCustomerBillPayment,
    ]);
};
