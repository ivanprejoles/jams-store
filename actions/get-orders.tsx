import { Order } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/order`;

interface Query {
    userId: string
}

const getOrders = async (query: Query) => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            userId: query.userId
        }
    });

    const res = await fetch(url);


    return res.json();
}

export default getOrders;