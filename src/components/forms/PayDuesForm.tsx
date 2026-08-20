"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createPaymentIntent } from "@/actions/payments";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function PaymentFormContent() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const result = await createPaymentIntent({
        payerName: name,
        payerEmail: email,
        amount: 125.0,
      });

      if (!result.ok) {
        setError(result.error);
        setIsProcessing(false);
        return;
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(result.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name, email },
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        setSuccess(true);
        setTimeout(() => router.push("/info/dues?success=true"), 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsProcessing(false);
    }
  }

  if (success) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Payment successful! Redirecting...
      </Alert>
    );
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Full name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isProcessing}
      />

      <TextField
        label="Email address"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isProcessing}
      />

      <Box
        sx={{
          p: 1.5,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "background.paper",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424242",
                "::placeholder": {
                  color: "#9e9e9e",
                },
              },
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!stripe || !elements || isProcessing}
        startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : undefined}
      >
        {isProcessing ? "Processing..." : "Pay $125.00"}
      </Button>
    </Stack>
  );
}

function NotConfiguredForm() {
  return (
    <Alert severity="warning">
      Payment processing is not configured yet. Please contact the board to report this issue.
    </Alert>
  );
}

export default function PayDuesForm() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only render Stripe Elements when client-side
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <CircularProgress />;
  }

  // If Stripe isn't configured, show the unconfigured message
  if (!stripePromise) {
    return <NotConfiguredForm />;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent />
    </Elements>
  );
}
