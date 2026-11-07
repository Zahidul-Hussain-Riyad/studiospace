import { Suspense } from "react";
import Banner from "../components/banner";

export default function Home() {
  return (
    <div>
      {/* Banner is a client slider (Swiper); Suspense is required because the
          slider initializes during render and uses timing APIs. */}
      <Suspense
        fallback={
          <div className="h-[560px] w-full bg-zinc-950 sm:h-[600px] lg:h-[660px]" />
        }
      >
        <Banner />
      </Suspense>
    </div>
  );
}
