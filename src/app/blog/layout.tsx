import { AdminProvider } from "@/context/AdminContext";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}