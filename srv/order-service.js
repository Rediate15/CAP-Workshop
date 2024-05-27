const cds = require("@sap/cds");

class OrderService extends cds.ApplicationService {
    init() {
        const {Orders, Books} = cds.entities("com.bookshop");

        this.on("cancel", "Orders", async (req) => {
            const orderId = req.params[0];
            UPDATE(Orders).where({ ID: orderId }).with({status: -1});
        })

        this.on("submit", "Orders", async (req) => {
            const orderId = req.params[0];
            const order = await SELECT.one.from(Orders).where({ID: orderId})
            if(order.status !== 0) {
                req.reject(400, `Order with status ${order.status} cannot be submitted`)
            }
            UPDATE(Orders).where({ ID: orderId }).with({status: 1});
        })

        this.on("getTotal", "Orders", async (req) => {
            const orderId = req.params[0];
            const orderWithItems = await SELECT.one.from(Orders, order => {
                order.items(item => {
                    item.amount, item.book`*`
                })
            }).where({ ID: orderId });
            const total = orderWithItems.items.reduce((prevSum, currentItem) => {
                return prevSum += (currentItem.amount * currentItem.book.price)
            }, 0);
            return total;
        })

        this.on("massCancel", async (req) => {
            const cancelPromises = req.data.IDs.map(id => this.cancel("Orders", id));
            await Promise.all(cancelPromises);
            return cancelPromises.length;
        })

        this.on("getNumberOfSubmittedOrders", async () => {
            const result = await SELECT.from(Orders).columns("count(*) as count").where({ status: 3});
            return result[0].count
        })

        return super.init();
    }
}

module.exports = OrderService;