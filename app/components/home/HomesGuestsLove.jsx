import { FiHeart } from "react-icons/fi";
import { roomData } from "../../../data/room_data";
import PropertySlider from "../shared/PropertySlider";

export default function HomesGuestsLove() {
  const properties = roomData.slice(12, 18);
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-[1.35rem] font-semibold">Homes guests love</h2>
        <div className="mt-4">
          <PropertySlider items={properties} />
        </div>
      </div>
    </section>
  );
}
