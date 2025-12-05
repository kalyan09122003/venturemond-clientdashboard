export const USD_TO_INR = 83.5;
export const TAX_RATE = 0.18; // 18% GST/Tax

export type Pricing = {
    inr: number;
    usd: number;
    period?: string; // e.g. "/month", "/user/month", " one-time"
    setupFee?: { inr: number; usd: number };
};

export type ServiceItem = {
    id: string;
    title: string;
    description?: string;
    price: Pricing;
    features: string[];
    badge?: string;
    tier?: string; // For MVP tiers
    sla?: string;
    deliverables?: string[];
    faqLink?: string;
};

export const STUDIO_SERVICES: ServiceItem[] = [
    {
        id: "mvp-tier-1",
        title: "Basic MVP",
        tier: "Tier 1",
        price: { inr: 1200000, usd: 15000, period: "one-time" },
        features: [
            "Product strategy & roadmap",
            "UI/UX design",
            "Full-stack development",
            "Cloud deployment",
            "3 months support"
        ],
        deliverables: ["Source Code", "Design Files", "Deployment Scripts"],
        sla: "48h Response Time",
        badge: "Popular"
    },
    {
        id: "mvp-tier-2",
        title: "Pro MVP",
        tier: "Tier 2",
        price: { inr: 2000000, usd: 25000, period: "one-time" },
        features: [
            "Everything in Basic",
            "Advanced Interactions",
            "Scalable Architecture",
            "Admin Dashboard",
            "6 months support"
        ],
        deliverables: ["Source Code", "Admin Panel", "Scalability Report"],
        sla: "24h Response Time"
    },
    {
        id: "mvp-tier-3",
        title: "Enterprise MVP",
        tier: "Tier 3",
        price: { inr: 3300000, usd: 40000, period: "one-time" },
        features: [
            "Everything in Pro",
            "Microservices",
            "Multi-tenant setup",
            "High availability",
            "12 months support"
        ],
        deliverables: ["Microservices Codebase", "HA Architecture", "Audit Logs"],
        sla: "1h Priority Support"
    },
    {
        id: "tech-strategy",
        title: "Tech Strategy",
        price: { inr: 290000, usd: 3500, period: "per engagement" },
        features: [
            "Technology audit",
            "Architecture review",
            "Scalability planning",
            "Security assessment",
            "Recommendations report"
        ],
        sla: "3 Business Days Turnaround",
        deliverables: ["Audit Report", "Architecture Blueprint"]
    },
    {
        id: "product-roadmap",
        title: "Product Roadmap",
        price: { inr: 200000, usd: 2500, period: "per project" },
        features: [
            "Feature discovery",
            "User story mapping",
            "Priority matrix",
            "Timeline estimation",
            "Resource planning"
        ],
        sla: "5 Business Days Turnaround",
        deliverables: ["Roadmap Doc", "User Stories", "Gantt Chart"]
    },
    {
        id: "growth-gtm",
        title: "Growth & GTM",
        price: { inr: 320000, usd: 4000, period: "/month" },
        features: [
            "Market analysis",
            "Growth strategy",
            "Marketing automation",
            "Analytics setup",
            "Monthly reporting"
        ],
        sla: "Weekly Strategy Calls",
        deliverables: ["Monthly Growth Report", "Campaign Setup"]
    }
];

export const WORKSPACE_PLANS: ServiceItem[] = [
    {
        id: "starter",
        title: "Starter",
        price: { inr: 1200, usd: 15, period: "/user/month" },
        features: [
            "File storage (100GB)",
            "Task management",
            "Basic Access controls",
            "Standard Integrations"
        ],
        sla: "Email Support (24h)",
        deliverables: ["Access to Starter Features"]
    },
    {
        id: "pro",
        title: "Pro",
        price: { inr: 2500, usd: 30, period: "/user/month" },
        features: [
            "File storage (1TB)",
            "Advanced Task management",
            "Granular Access controls",
            "Premium Integrations",
            "Priority Support"
        ],
        badge: "Best Value",
        sla: "Priority Email & Chat (4h)",
        deliverables: ["Access to Pro Features"]
    },
    {
        id: "enterprise",
        title: "Enterprise",
        price: { inr: 0, usd: 0, period: "Custom pricing" }, // 0 implies custom
        features: [
            "Unlimited Storage",
            "Dedicated Manager",
            "SSO & Audit Logs",
            "Custom SLA",
            "White-glove onboarding"
        ],
        badge: "Custom / Security",
        sla: "Dedicated Account Manager",
        deliverables: ["Custom Contract", "SLA Agreement"]
    }
];

export const ADDONS: ServiceItem[] = [
    {
        id: "priority-support",
        title: "Priority Support",
        price: { inr: 8000, usd: 99, period: "/month" },
        features: ["24/7 Response", "Dedicated Slack Channel"]
    },
    {
        id: "sso",
        title: "SSO Setup",
        price: { inr: 25000, usd: 299, period: "one-time" },
        features: ["SAML/OIDC Integration", "Identity Provider Setup"]
    },
    {
        id: "white-label",
        title: "White-label Branding",
        price: { inr: 40000, usd: 500, period: "one-time" },
        features: ["Custom Domain", "Custom Email", "Brand Colors/Logo"]
    },
    {
        id: "dedicated-instance",
        title: "Dedicated Instance",
        price: { inr: 150000, usd: 2000, period: "/month" },
        features: ["Isolated Environment", "Custom VPC", "VPN Access"]
    }
];
