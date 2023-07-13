import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe('pk_test_51I3NaSLwxaQeH6SwVG0oERyzzTxah6UZpMr4Lnf0BweKTq3IUr1dFJpjjIOIszdMmKCE2F44hCDKNeO9TfdQ2k9K007jrA0FaH');
