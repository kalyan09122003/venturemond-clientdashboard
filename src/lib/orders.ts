import { CartItem } from "./cart";

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: "active" | "provisioning" | "pending" | "completed" | "cancelled" | "paid" | "payment_failed";
    currency: "INR" | "USD";
    paymentMethod?: "card" | "upi" | "invoice";
    invoiceNumber?: string;
    contractStatus?: "pending" | "signed" | "uploaded";
    subtotal?: number;
    tax?: number;
    discount?: number;
    billingDetails?: {
        name: string;
        address: string;
        city: string;
        country: string;
        taxId?: string;
    };
    timeline?: {
        status: "created" | "paid" | "provisioning" | "kickoff" | "delivery";
        label: string;
        date: string;
        done: boolean;
        description?: string;
    }[];
    subscription?: {
        planId: string;
        planName: string;
        billingPeriod: "monthly" | "yearly";
        nextBillingDate: string;
        status: "active" | "cancelled" | "past_due" | "trial" | "renewal_failed";
        usage?: {
            seats: { used: number; total: number };
            storage: { used: number; total: number; unit: "GB" };
        };
    };
}

// Initial mock data
const initialOrders: Order[] = [
    {
        id: "ORD-2024-001",
        date: "2024-01-15",
        items: [
            { id: "1", title: "Workspace Pro", price: 248, currency: "USD", quantity: 1, period: "monthly" },
            { id: "2", title: "Priority Support", price: 0, currency: "USD", quantity: 1, period: "monthly" } // simplified
        ],
        subtotal: 248,
        tax: 0,
        total: 248,
        status: "active",
        currency: "USD",
        contractStatus: "signed",
        billingDetails: {
            name: "VentureMond Inc.",
            address: "123 Startup Blvd",
            city: "San Francisco",
            country: "USA",
            taxId: "US-123456789"
        },
        timeline: [
            { status: "created", label: "Order Created", date: "Jan 15, 2024", done: true, description: "Order placed successfully" },
            { status: "paid", label: "Payment Confirmed", date: "Jan 15, 2024", done: true, description: "Payment via Credit Card" },
            { status: "provisioning", label: "Provisioning", date: "Jan 15, 2024", done: true, description: "Workspace set up" }
        ],
        subscription: {
            planId: "pro",
            planName: "Workspace Pro",
            billingPeriod: "monthly",
            nextBillingDate: "Feb 15, 2024",
            status: "active",
            usage: {
                seats: { used: 12, total: 25 },
                storage: { used: 45, total: 100, unit: "GB" }
            }
        }
    },
    {
        id: "ORD-2024-002",
        date: "2024-01-10",
        items: [
            { id: "3", title: "MVP Development", price: 15000, currency: "USD", quantity: 1, period: "one-time" }
        ],
        subtotal: 15000,
        tax: 0,
        total: 15000,
        status: "pending",
        currency: "USD",
        contractStatus: "pending",
        billingDetails: {
            name: "VentureMond Inc.",
            address: "123 Startup Blvd",
            city: "San Francisco",
            country: "USA"
        },
        timeline: [
            { status: "created", label: "Order Created", date: "Jan 10, 2024", done: true, description: "Order placed successfully" }
        ]
    },
    {
        id: "ORD-2024-003",
        date: "2023-12-20",
        items: [
            { id: "4", title: "Tech Strategy", price: 3500, currency: "USD", quantity: 1, period: "one-time" }
        ],
        subtotal: 3500,
        total: 3500,
        status: "completed",
        currency: "USD",
        contractStatus: "signed",
        timeline: [
            { status: "created", label: "Order Created", date: "Dec 20, 2023", done: true },
            { status: "paid", label: "Payment Confirmed", date: "Dec 20, 2023", done: true },
            { status: "delivery", label: "Delivered", date: "Dec 28, 2023", done: true }
        ]
    },
    {
        id: "ORD-2024-004",
        date: "2023-12-01",
        items: [
            { id: "5", title: "Workspace Starter", price: 49, currency: "USD", quantity: 1, period: "monthly" }
        ],
        subtotal: 49,
        total: 49,
        status: "cancelled",
        currency: "USD",
        subscription: {
            planId: "starter",
            planName: "Workspace Starter",
            billingPeriod: "monthly",
            nextBillingDate: "N/A",
            status: "cancelled",
            usage: {
                seats: { used: 3, total: 5 },
                storage: { used: 2, total: 10, unit: "GB" }
            }
        }
    },
];

let orders: Order[] = [...initialOrders];

export const ordersService = {
    getOrders: () => {
        return orders;
    },

    addOrder: (order: Omit<Order, "id" | "date" | "status">) => {
        const newOrder: Order = {
            id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: "pending",
            invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
            contractStatus: "signed", // Assuming successful checkout flow signs it
            timeline: [
                { status: "created", label: "Order Created", date: new Date().toLocaleDateString(), done: true, description: "Order placed successfully" },
                { status: "paid", label: "Payment Pending", date: "TBD", done: false, description: "Waiting for payment confirmation" }
            ],
            ...order,
        };
        orders = [newOrder, ...orders];
        return newOrder;
    },

    getOrder: (id: string) => {
        return orders.find(o => o.id === id);
    }
};
