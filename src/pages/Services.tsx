import { useState } from "react";
import { Check, Star, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = [
  {
    id: "mvp",
    name: "MVP Development",
    description: "Full-stack product development from idea to launch",
    price: "From $15,000",
    period: "per project",
    popular: true,
    features: [
      "Product strategy & roadmap",
      "UI/UX design",
      "Full-stack development",
      "Cloud deployment",
      "3 months support",
    ],
    deliverables: ["Working product", "Source code", "Documentation"],
  },
  {
    id: "strategy",
    name: "Tech Strategy",
    description: "Strategic technology consulting and architecture",
    price: "$3,500",
    period: "per engagement",
    popular: false,
    features: [
      "Technology audit",
      "Architecture review",
      "Scalability planning",
      "Security assessment",
      "Recommendations report",
    ],
    deliverables: ["Strategy document", "Tech roadmap", "Recommendations"],
  },
  {
    id: "roadmap",
    name: "Product Roadmap",
    description: "Detailed product planning and feature prioritization",
    price: "$2,500",
    period: "per project",
    popular: false,
    features: [
      "Feature discovery",
      "User story mapping",
      "Priority matrix",
      "Timeline estimation",
      "Resource planning",
    ],
    deliverables: ["Product backlog", "Roadmap document", "Gantt chart"],
  },
  {
    id: "gtm",
    name: "Growth & GTM",
    description: "Go-to-market strategy and growth consulting",
    price: "$4,000",
    period: "per month",
    popular: false,
    features: [
      "Market analysis",
      "Growth strategy",
      "Marketing automation",
      "Analytics setup",
      "Monthly reporting",
    ],
    deliverables: ["GTM strategy", "Growth playbook", "Analytics dashboard"],
  },
];

const plans = [
  {
    id: "starter",
    name: "Workspace Starter",
    description: "For individuals and small teams",
    price: "$49",
    period: "/month",
    features: [
      "5 team members",
      "10 GB storage",
      "Basic support",
      "API access",
      "Email notifications",
    ],
  },
  {
    id: "pro",
    name: "Workspace Pro",
    description: "For growing teams",
    price: "$149",
    period: "/month",
    popular: true,
    features: [
      "25 team members",
      "100 GB storage",
      "Priority support",
      "Advanced API",
      "Custom integrations",
      "SSO",
    ],
  },
  {
    id: "enterprise",
    name: "Workspace Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited members",
      "Unlimited storage",
      "Dedicated support",
      "Full API access",
      "White-label option",
      "SLA guarantee",
      "Dedicated instance",
    ],
  },
];

const addons = [
  { id: "priority", name: "Priority Support", price: "$99/mo", icon: Zap },
  { id: "sso", name: "SSO Integration", price: "$49/mo", icon: Shield },
  { id: "whitelabel", name: "White-Label", price: "$199/mo", icon: Star },
  { id: "seats", name: "Extra Seats", price: "$10/seat/mo", icon: Users },
];

export default function Services() {
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Service Catalog</h1>
        <p className="text-muted-foreground mt-1">
          Choose from our range of services and plans
        </p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Studio Services</TabsTrigger>
          <TabsTrigger value="plans">Workspace Plans</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={cn(
                  "dashboard-card relative overflow-hidden animate-slide-up",
                  service.popular && "ring-2 ring-accent",
                  `stagger-${index + 1}`
                )}
                style={{ opacity: 0 }}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {service.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1" variant={service.popular ? "accent" : "default"}>
                      Buy Now
                    </Button>
                    <Button variant="outline">Request Quote</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setCompareOpen(true)}>
              Compare Plans
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={cn(
                  "dashboard-card relative animate-slide-up",
                  plan.popular && "ring-2 ring-accent",
                  `stagger-${index + 1}`
                )}
                style={{ opacity: 0 }}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Recommended
                  </Badge>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-4"
                    variant={plan.popular ? "accent" : "outline"}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Start Trial"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addons" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon, index) => (
              <div
                key={addon.id}
                className={cn(
                  "dashboard-card animate-slide-up",
                  `stagger-${index + 1}`
                )}
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <addon.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground">{addon.price}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Compare Modal */}
      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compare Plans</DialogTitle>
            <DialogDescription>
              See what's included in each workspace plan
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center py-3 px-4">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Team members", "Storage", "Support", "API", "SSO", "White-label"].map(
                  (feature) => (
                    <tr key={feature} className="border-b">
                      <td className="py-3 px-4">{feature}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          {plan.features.some((f) =>
                            f.toLowerCase().includes(feature.toLowerCase())
                          ) ? (
                            <Check className="h-4 w-4 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
