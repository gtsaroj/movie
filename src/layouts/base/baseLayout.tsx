import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/nav/nav";
import { Outlet } from "react-router";

export const BaseLayout = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <Header />
        <div className="w-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };