const Order = require('../models/order.model')
const User = require('../models/user.models')
const Stripe = require('stripe')


const stripe = new Stripe('sk_test_51PVXVZP7MCQR22CAhjSGUeYhkFXIVNZ1BaJ7kxTKOOhlIN0v9jB7OaSh7D5WIKO5P1rxIXaUcGEHQFtbXq4UZXyQ00VjHoGdvO')
exports.placeorder = async (req, res,next) => {

    try {
const neworder = new Order({
    userid: req.body.userid,
    items: req.body.items,
    address: req.body.address,
    amount: req.body.amount

})
await neworder.save()
await User.findByIdAndUpdate(req.body.userid, {})

   const line_items = req.body.items?.map((i)=>({
    price_data: {
        currency: "inr",
        product_data: {
            name: i.name
        },
        unit_amount: i.price * 100*80
    },
    quantity: i.quantity
}))
line_items?.push({
    price_data: {
        currency: "inr",
        product_data: {
            name: "Deliver Charges"
        },
        unit_amount: 5 * 100 * 80
    },
    quantity: 1
})
const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",

    success_url: `http://localhost:5173/verify?success=true&order_id=${neworder._id}`,
    cancel_url: `http://localhost:5173/verify?success=false&order_id=${neworder._id}`,
})

res.status(200).json({
    success: true,
    message: "order placed successfully",
    data: neworder,
    session_url: session.url
})
    } catch (error) {
        return next(error)
}
}


// exports.verifyorder = async (req, res,next) => {
//     try{
// const {success, order_id} = req.query

//   const order =  await Order.findByIdAndUpdate(order_id,{payment: true})

// res.status(200).json({
//     success: true,
//     message: "order verified successfully",
// order
// })
exports.verifyorder = async (req, res, next) => {
    try {
        const { success, order_id } = req.body;
        console.log("Received order_id:", order_id);

        // Check if order_id is provided
        if (!order_id) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }

        // // Check if order_id is a valid ObjectId (if using MongoDB)
        // if (!mongoose.Types.ObjectId.isValid(order_id)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid Order ID"
        //     });
        // }

        const order = await Order.findByIdAndUpdate(order_id, { payment: true }, { new: true });
        
        // Check if order was found and updated
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "payment done",
            order
        });
    } catch (error) {
            await Order.findByIdAndDelete(order_id)
        console.error("Error verifying order:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// else{
//     await Order.findByIdAndDelete(order_id)

// res.status(400).json({
//     success: false,
//     message: "order cancelled ",
// })

    
// }
//     catch(error){
//         // await Order.findByIdAndDelete(order_id)
// return next(error)
//     }
// }
//userorder for frontend

exports.userorder = async (req, res,next) => {
    try {
        const orders = await Order.find({userid: req.body.userid})
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        return next(error)
    }
}
exports.listorder = async (req, res,next) => {
    try {
        const orders = await Order.find()
        res.status(200).json({
            success: true,
            message: "all orders",
            data: orders
        })
    } catch (error) {
        return next(error)
    }
}
exports.updatestatus = async (req, res,next) => {
    try {
        const {id, status} = req.body
        const order = await Order.findByIdAndUpdate(id,{status})
        res.status(200).json({
            success: true,
            message: "order status updated",
            data: order
        })
    } catch (error) {
        return next(error)
    }
}