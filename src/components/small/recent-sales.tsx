import type { LatestTransaction } from "@/types/Api";

export function RecentSales({
  latestTransaction,
}: {
  latestTransaction?: LatestTransaction[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 items-center justify-between border-b-2 pb-2 ">
        <span className="text-sm leading-none font-medium">Order Id</span>
        <span className="text-muted-foreground text-sm">Product Quantity </span>
        <span className="text-muted-foreground text-sm">Discount</span>
        <span className="text-muted-foreground text-sm">Status</span>
        <span className="font-medium">₹Amount</span>
      </div>

      {latestTransaction?.map((order) => {
        return (
          <div key={order._id} className="flex flex-1 gap-4 items-center justify-between border py-3 px-2 cursor-pointer rounded-md hover:bg-gray-300">
            <p className="text-sm leading-none font-medium">
              {order._id.slice(4, 8)}
            </p>
            <p className="text-muted-foreground text-sm">{order.quantity}</p>
            <p className="text-muted-foreground text-sm">-₹{order.discount}</p>
            <p className="text-muted-foreground text-sm">{order.status}</p>
            <div className="font-medium">+₹{order.amount}</div>
          </div>
        );
      })}
    </div>
  );
}
