import { Toaster } from "react-hot-toast";
import { Link } from "react-router";

function Dashboard() {
  return (
    <>
    <Toaster position="top-center"/>
      <div className="m-auto max-w-[1280px] p-2 font-[Geist]">
        {/* Brand Logo */}
        <h1>
          <Link
            to={"/"}
            className="text-2xl font-bold tracking-tight font-[Brand] py-4 mb-3 "
          >
            Fredzy Paris
          </Link>
        </h1>
        {/* links  */}
        <div className="w-full flex-wrap  gap-2 pt-4 flex  justify-center">
          <Link className="border px-2 py-1 rounded-sm active:bg-neutral-300" to={"/"} onClick={() => (window.document.title = "Dashboard")}>
            Overview
          </Link>
          <Link
          className="border px-2 py-1 rounded-sm active:bg-neutral-300" 
            to={"/products"}
            onClick={() => (window.document.title = "Products")}
          >
            Products
          </Link>
          <Link
          className="border px-2 py-1 rounded-sm active:bg-neutral-300" 
            to={"/orders"}
            onClick={() => (window.document.title = "Orders")}
          >
            Orders
          </Link>
          <Link className="border px-2 py-1 rounded-sm active:bg-neutral-300"  to={"/users"} onClick={() => (window.document.title = "Users")}>
            User
          </Link>

          <Link
          className="border px-2 py-1 rounded-sm active:bg-neutral-300" 
            to={"/analytics"}
            onClick={() => (window.document.title = "Analytics")}
          >
            Analytics
          </Link>
          <Link
          className="border px-2 py-1 rounded-sm active:bg-neutral-300" 
            to={"/reports"}
            onClick={() => (window.document.title = "Reports")}
          >
            Reports
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
