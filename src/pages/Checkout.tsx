import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, CreditCard, Building2, Smartphone, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cartService, CartItem } from "@/lib/cart";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"cart" | "payment" | "contract" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    setCartItems(cartService.getCart());
  }, []);

  const refreshCart = () => setCartItems([...cartService.getCart()]);

  const removeItem = (id: string) => {
    cartService.removeItem(id);
    refreshCart();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (cartItems.length === 0 && step !== "success") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <CreditCard className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any services yet.</p>
        <Button asChild>
          <Link to="/services">Note our Services</Link>
        </Button>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="dashboard-card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order #ORD-{Date.now().toString().slice(-6)} has been confirmed.
          </p>
          <div className="bg-secondary/50 rounded-lg p-6 text-left mb-6">
            <h3 className="font-medium mb-3">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-2">
                <span>{item.title}</span>
                <span>{item.currency === "INR" ? "₹" : "$"}{item.price.toLocaleString()}</span>
              </div>
            ))}
            <Separator className="my-3" />
            <div className="flex justify-between font-medium">
              <span>Total Paid</span>
              <span>{cartItems[0]?.currency === "INR" ? "₹" : "$"}{total.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">Download Receipt</Button>
            <Button asChild><Link to="/orders">View Order</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-1">Complete your purchase</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {["cart", "payment", "contract"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === s
                  ? "bg-primary text-primary-foreground"
                  : cartItems.length > 0 && i < ["cart", "payment", "contract"].indexOf(step)
                    ? "bg-success text-success-foreground"
                    : "bg-secondary text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <span className="text-sm font-medium capitalize hidden sm:inline">{s}</span>
            {i < 2 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {step === "cart" && (
            <div className="dashboard-card">
              <h2 className="section-title mb-4">Cart Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Quantity logic simplified for now since we just add 1 */}
                      <span className="font-medium w-30 text-right">
                        {item.currency === "INR" ? "₹" : "$"}{item.price.toLocaleString()}
                      </span>
                      <Button variant="ghost" size="icon-sm" className="text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="dashboard-card">
              <h2 className="section-title mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border cursor-pointer",
                    paymentMethod === "card" && "border-primary bg-primary/5"
                  )}
                  onClick={() => setPaymentMethod("card")}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit / Debit Card
                  </Label>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border cursor-pointer",
                    paymentMethod === "upi" && "border-primary bg-primary/5"
                  )}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI Payment
                  </Label>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border cursor-pointer",
                    paymentMethod === "invoice" && "border-primary bg-primary/5"
                  )}
                  onClick={() => setPaymentMethod("invoice")}
                >
                  <RadioGroupItem value="invoice" id="invoice" />
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="invoice" className="flex-1 cursor-pointer">
                    Invoice / Bank Transfer
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" className="mt-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "contract" && (
            <div className="dashboard-card">
              <h2 className="section-title mb-4">Contract & Agreement</h2>
              <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload signed contract or sign digitally
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline">Upload Contract</Button>
                  <Button>Sign Digitally</Button>
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-accent hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-accent hover:underline">
                      Data Processing Agreement
                    </a>
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="dashboard-card sticky top-24">
            <h2 className="section-title mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.title}</span>
                  <span>{item.currency === "INR" ? "₹" : "$"}{item.price.toLocaleString()}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{cartItems[0]?.currency === "INR" ? "₹" : "$"}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (18%)</span>
                <span>{cartItems[0]?.currency === "INR" ? "₹" : "$"}{tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{cartItems[0]?.currency === "INR" ? "₹" : "$"}{total.toLocaleString()}</span>
              </div>
            </div>
            <Button
              className="w-full mt-6"
              variant="default"
              onClick={() => {
                if (step === "cart") setStep("payment");
                else if (step === "payment") setStep("contract");
                else if (step === "contract") {
                  cartService.clearCart();
                  setStep("success");
                }
              }}
            >
              {step === "cart" && "Proceed to Payment"}
              {step === "payment" && "Continue to Contract"}
              {step === "contract" && "Complete Purchase"}
            </Button>

            {step !== "cart" && (
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => {
                  if (step === "payment") setStep("cart");
                  else if (step === "contract") setStep("payment");
                }}
              >
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
