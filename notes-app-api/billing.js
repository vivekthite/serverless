import stripePackae from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success , failure } from "./libs/response-lib";

export async function main(event , context , callback) {
    const { storage , source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Notes Charge";

    //load stripe secret key from env variable
    const stripe = stripePackae(process.env.stripeSecretKey);

    try {
        await stripe.charges.create({
            amount,
            currency: "usd",
            source, // obtained with Stripe.js
            description
          });
          callback(null,success({status : true}));
    } catch (error) {
        callback(null, failure({ message: error.message }));
    }

}