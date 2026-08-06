import {
  ShoppingBag,
  Wallet,
  Download,
  Users,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import QuickAction from "@/components/dashboard/QuickAction";
import PlatformCard from "@/components/dashboard/PlatformCard";
import RecentOrders from "@/components/dashboard/RecentOrders";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Leads Expert
        </p>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <StatsCard
          title="Orders"
          value="24"
          icon={<ShoppingBag />}
        />

        <StatsCard
          title="Wallet"
          value="₹1500"
          icon={<Wallet />}
        />

        <StatsCard
          title="Downloads"
          value="18"
          icon={<Download />}
        />

        <StatsCard
          title="Purchased Leads"
          value="950"
          icon={<Users />}
        />

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

        <QuickAction
          title="Browse Leads"
          href="/browse-leads"
          icon={<ShoppingBag />}
        />

        <QuickAction
          title="Orders"
          href="/orders"
          icon={<ShoppingBag />}
        />

        <QuickAction
          title="Downloads"
          href="/downloads"
          icon={<Download />}
        />

        <QuickAction
          title="Wallet"
          href="/wallet"
          icon={<Wallet />}
        />

      </div>

      <div>

        <h2 className="text-2xl font-bold mb-5">
          Popular Platforms
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

          <PlatformCard
            title="Instagram"
            leads={25000}
          />

          <PlatformCard
            title="Facebook"
            leads={18500}
          />

          <PlatformCard
            title="Snapchat"
            leads={9500}
          />

          <PlatformCard
            title="YouTube"
            leads={11000}
          />

        </div>

      </div>

      <RecentOrders />

    </div>
  );
}