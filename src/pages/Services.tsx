import { useState } from "react";
import { Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfiguratorModal, QuoteModal, CompareModal } from "@/components/dashboard/services/Modals";
import { cartService } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { STUDIO_SERVICES, WORKSPACE_PLANS, ADDONS, Pricing, ServiceItem } from "@/components/dashboard/services/constants";

export default function Services() {
  const [compareOpen, setCompareOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<string | null>(null);
  const [configPlan, setConfigPlan] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">("USD");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (item: ServiceItem) => {
    const price = currency === "INR" ? item.price.inr : item.price.usd;

    cartService.addToCart({
      id: item.id,
      title: item.title,
      price: price,
      currency: currency,
      quantity: 1,
      period: item.price.period
    });

    toast({
      title: "Added to Cart Setup",
      description: `${item.title} added to your cart.`
    });
    navigate("/checkout");
  };

  const formatPrice = (price: Pricing, curr: "INR" | "USD") => {
    if (price.usd === 0 && price.inr === 0) return "Custom";
    const amount = curr === "INR" ? price.inr : price.usd;
    const formatted = new Intl.NumberFormat(curr === "INR" ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${formatted}${price.period && price.period !== "one-time" ? ` ${price.period}` : ''}`;
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Services & Pricing </h1>
          <p className="text-muted-foreground mt-1">
            Choose from our range of services and plans
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg">
          <Button
            variant={currency === "INR" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrency("INR")}
            className="text-xs"
          >
            INR (₹)
          </Button>
          <Button
            variant={currency === "USD" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrency("USD")}
            className="text-xs"
          >
            USD ($)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="services" className="space-y-8">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="services">Studio Services</TabsTrigger>
          <TabsTrigger value="plans">Workspace Plans</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Studio Services</h2>
              <p className="text-muted-foreground text-sm">
                End-to-end development and consulting services
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCompareOpen(true)}>
              Compare Services
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDIO_SERVICES.map((service) => (
              <div
                key={service.id}
                className="dashboard-card relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
              >
                {service.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {service.badge}
                  </Badge>
                )}
                <div className="mb-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <div className="text-2xl font-bold mt-2">
                    {formatPrice(service.price, currency)}
                  </div>
                  {service.tier && (
                    <Badge variant="outline" className="mt-2 text-xs">{service.tier}</Badge>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" onClick={() => handleAddToCart(service)}>
                      Buy Now
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setQuoteService(service.title)}>
                      Request Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {WORKSPACE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "dashboard-card relative transition-all duration-300",
                  plan.badge ? "border-primary shadow-lg scale-105" : "hover:border-primary/50"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <div className="text-center mb-6 pt-4">
                  <h3 className="font-bold text-lg">{plan.title}</h3>
                  <div className="text-3xl font-bold mt-2">
                    {formatPrice(plan.price, currency)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">per user/month</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={plan.badge ? "default" : "outline"}
                  onClick={() => {
                    if (plan.id === "enterprise") {
                      setQuoteService(plan.title);
                    } else {
                      setConfigPlan(plan.id);
                    }
                  }}
                >
                  {plan.id === "enterprise" ? "Contact Sales" : "Start Trial"}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addons" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="dashboard-card hover:border-primary/50 transition-all">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">{addon.title}</h3>
                  <div className="text-lg font-bold mt-1">
                    {formatPrice(addon.price, currency)}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {addon.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-success mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="secondary" onClick={() => handleAddToCart(addon)}>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ConfiguratorModal
        isOpen={!!configPlan}
        onClose={() => setConfigPlan(null)}
        planId={configPlan || undefined}
        currency={currency}
      />

      <QuoteModal
        isOpen={!!quoteService}
        onClose={() => setQuoteService(null)}
        serviceName={quoteService || ""}
      />

      <CompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        currency={currency}
      />
    </div>
  );
}
