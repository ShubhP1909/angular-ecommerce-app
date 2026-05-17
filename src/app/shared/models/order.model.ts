export interface OrderLineItem {
    description: string | null;
    quantity: number;
    amountTotal: number;
    currency: string;
    image?: string | null;
}

export interface Order {
    id: string;
    sessionId: string;
    status: string;
    paymentStatus: string;
    amountTotal: number;
    currency: string;
    customerEmail: string | null;
    createdAt: string;
    items: OrderLineItem[];
}
