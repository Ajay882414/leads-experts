import {
  LayoutDashboard,
  Layers3,
  Database,
  Users,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Download,
  LifeBuoy,
  UserCheck,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Platforms",
    href: "/admin/platforms",
    icon: Layers3,
  },
  {
    title: "Leads",
    href: "/admin/leads",
    icon: Database,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
  title: "Notifications",
  href: "/admin/notifications",
  icon: Bell,
},
{
  title: "Downloads",
  href: "/admin/downloads",
  icon: Download,
},
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
  title: "Client Referrals",
  href: "/admin/referrals",
  icon: UserCheck, // ya Users icon
},
{
    title: "Support Tickets",
    href: "/admin/support",
  icon: LifeBuoy, // from lucide-react
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];