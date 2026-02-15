import { FiHeart } from "react-icons/fi";
import PropertySlider from "../shared/PropertySlider";
import { roomData } from "../../../data/room_data";

export default function DealsWeekend() {
  const properties = roomData.slice(5, 13);
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-4 flex md:items-center flex-col md:flex-row items-start justify-between gap-4">
          <h2 className="text-[1.35rem] font-semibold">
            Deals for the weekend
          </h2>
          <span className="text-muted">
            Save 20% or more with early 2026 deals
          </span>
        </div>
        <div className="mt-4">
          <PropertySlider items={properties} />
        </div>
      </div>
    </section>
  );
}
