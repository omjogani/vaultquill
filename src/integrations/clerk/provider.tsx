import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing CLERK_PUBLISHABLE_KEY in .env");
}

function AppClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
}

export default AppClerkProvider;
