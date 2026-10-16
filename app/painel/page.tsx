import type { Metadata } from "next";
import { Suspense } from "react";
import { Dashboard } from "@/components/painel/Dashboard";
import { LoginForm } from "@/components/painel/LoginForm";
import { getDashboard } from "@/lib/metrics";
import { isAuthed } from "@/lib/painel-auth";

export const metadata: Metadata = {
  title: "Painel · Pré-Black Bengô",
  robots: { index: false, follow: false },
};

const Gate = async () => {
  if (!(await isAuthed())) return <LoginForm />;
  return <Dashboard data={await getDashboard()} />;
};

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <span className="size-10 animate-spin rounded-full border-4 border-white/10 border-t-verde" />
  </div>
);

const Page = () => (
  <main className="min-h-screen flex-1 bg-noite">
    <Suspense fallback={<Loading />}>
      <Gate />
    </Suspense>
  </main>
);

export default Page;
