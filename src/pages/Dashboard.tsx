import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabs from "@/components/Tabs/Overveiw";
import Products from "@/components/Tabs/Products";
import Orders from "@/components/Tabs/Orders";
import Analytics from "@/components/Tabs/Analytics";
import Reports from "@/components/Tabs/Reports";
import Users from "@/components/Tabs/User";

function Dashboard() {
  return (
    <>
      <div className="m-auto max-w-[1280px] px-1 font-[Geist]">
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold tracking-tight font-[Brand] p-2">
          Fredzy Paris
        </h1>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          {/* Tabs List */}
          <div className="w-full overflow-x-auto  flex  justify-center">
            <TabsList>
              <TabsTrigger
                onClick={() => (window.document.title = "Dashboard")}
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                onClick={() => (window.document.title = "Products")}
                value="products"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                onClick={() => (window.document.title = "Orders")}
                value="orders"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                onClick={() => (window.document.title = "Users")}
                value="users"
              >
                User
              </TabsTrigger>
              <TabsTrigger
                onClick={() => (window.document.title = "Analytics")}
                value="analytics"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                onClick={() => (window.document.title = "Reports")}
                value="reports"
              >
                Reports
              </TabsTrigger>
            </TabsList>
          </div>


          <TabsContent value="overview" className="space-y-4">
            <OverviewTabs />
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <Products />
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            <Orders />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Reports />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Users />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Dashboard;
