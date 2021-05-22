import axios from "axios";

export default axios.create({
    baseURL: "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurants-reviews-svquc/service/restaurants/incoming_webhook/restaurants",
    headers: {
        "Content-type": "application/json"
    }
});