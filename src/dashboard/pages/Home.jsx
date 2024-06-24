import EventSlider from "../componets/EventSlider";
import FeturedCat from "../componets/FeturedCat";
import UpcomingEvent from "../componets/UpcomingEvent";

export default function Home() {
  return (
    <div>
      <EventSlider />
      <UpcomingEvent />
      <FeturedCat />
    </div>
  );
}
