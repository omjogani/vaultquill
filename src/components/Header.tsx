import { Link } from "@tanstack/react-router";

import TanStackChatHeaderUser from "../integrations/tanchat/header-user.tsx";
import HeaderUser from "@/integrations/clerk/header-user.tsx";
import Cart from "./Cart.tsx";

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/table">TanStack Table</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/server-funcs">Start - Server Functions</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/api-request">Start - API Request</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/simple">Simple Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/example/chat">Chat</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/example/guitars">Guitar Demo</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/store">Store</Link>
        </div>
      </nav>

      <div className="flex flex-row gap-2">
        <Cart />
        <HeaderUser />
        <TanStackChatHeaderUser />
      </div>
    </header>
  );
}
