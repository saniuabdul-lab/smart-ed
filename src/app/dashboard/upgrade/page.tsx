"use client";

import { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { Check, Crown, Zap, Building } from "lucide-react";

const plans = [
  {
    name: "Starter",
    value: "starter",
    price: 18000,
    period: "per term",
    description: "Perfect for individual teachers",
    color: "border-teal-200",
    badgeColor: "bg-teal-50 text-teal-600 border-teal-200",
    buttonColor: "bg-teal-600 hover:bg-teal-700 text-white",
    icon: Zap,
    popular: false,
    features: [
      "Everything in Free",
      "Unlimited generations",
      "First and Second Term schemes",
      "Clean PDF export without watermark",
      "DOCX export",
      "Priority email support",
      "Advanced assessment tools",
    ],
  },
  {
    name: "Professional",
    value: "pro",
    price: 45000,
    period: "per term",
    description: "For schools with multiple teachers",
    color: "border-amber-300",
    badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
    buttonColor: "bg-amber-500 hover:bg-amber-600 text-gray-900",
    icon: Crown,
    popular: true,
    features: [
      "Everything in Starter",
      "Full-year scheme of work",
      "All lesson plan methods",
      "WAEC and NECO style exams",
      "School branding and letterhead",
      "Teacher management",
      "Admin dashboard",
      "Unlimited users",
    ],
  },
  {
    name: "Enterprise",
    value: "enterprise",
    price: 0,
    period: "custom pricing",
    description: "For school chains and proprietors",
    color: "border-indigo-200",
    badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    buttonColor: "bg-indigo-600 hover:bg-indigo-700 text-white",
    icon: Building,
    popular: false,
    features: [
      "Everything in Professional",
      "Multi-campus management",
      "API access",
      "White-label platform",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Staff training included",
    ],
  },
];

interface PaystackButtonProps {
  plan: (typeof plans)[0];
  userEmail: string;
  onSuccess: (reference: string, plan: string) => void;
}

function PaystackButton({
  plan,
  userEmail,
  onSuccess,
}: PaystackButtonProps) {
  const config = {
    reference: `smarted_${plan.value}_${new Date().getTime()}`,
    email: userEmail,
    amount: plan.price * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    initializePayment({
      onSuccess: (transaction: any) => {
        onSuccess(transaction.reference, plan.value);
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${plan.buttonColor}`}
    >
      Upgrade to {plan.name} — ₦{plan.price.toLocaleString()}
    </button>
  );
}

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("user@smarted.ng");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  const handlePaymentSuccess = async (
    reference: string,
    plan: string
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, plan }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(
          `Successfully upgraded to ${plan} plan! Redirecting...`
        );
        setTimeout(() => {
          window.location.href = "/dashboard/overview";
        }, 2000);
      } else {
        setError(
          data.error ||
            "Payment verification failed. Please contact support."
        );
      }
    } catch {
      setError(
        "Network error. Please contact support with reference: " +
          reference
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-4">
            <Crown size={14} className="text-amber-500" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Upgrade Your Plan
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Unlock the Full SMART-ED Platform
          </h1>
          <p className="text-gray-500 text-lg">
            Choose the plan that works for your school
          </p>
        </div>

        {success && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 text-center text-teal-700 font-semibold">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center text-red-600">
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-center text-blue-700 font-semibold">
            Verifying your payment...
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap z-10">
                    Most Popular
                  </div>
                )}
                <div
                  className={`bg-white rounded-2xl border-2 p-7 h-full flex flex-col ${plan.color}`}
                >
                  <div className="mb-6">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${plan.badgeColor}`}
                    >
                      {plan.name}
                    </span>
                    <div className="flex items-center gap-3 mt-4 mb-2">
                      <Icon size={22} className="text-gray-700" />
                      <div>
                        {plan.price > 0 ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">
                              ₦{plan.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400">
                              / {plan.period}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">
                            Custom Pricing
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex-1 border-t border-gray-100 pt-5 mb-6">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 mb-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check
                            size={10}
                            className="text-teal-600"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plan.price > 0 ? (
                    <PaystackButton
                      plan={plan}
                      userEmail={userEmail}
                      onSuccess={handlePaymentSuccess}
                    />
                  ) : (
                    
                     <a href="mailto:hello@smarted.ng"
                      className={`block w-full text-center font-bold py-3.5 rounded-xl text-sm transition-colors ${plan.buttonColor}`}
                    >
                      Contact Sales
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-3">
            Payment is Safe and Secure
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            All payments are processed securely by Paystack, Nigeria's
            leading payment gateway. We accept cards, bank transfer and
            USSD. Your subscription activates immediately after payment.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {["Verve", "Mastercard", "Visa", "Bank Transfer", "USSD"].map(
              (method) => (
                <span
                  key={method}
                  className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}