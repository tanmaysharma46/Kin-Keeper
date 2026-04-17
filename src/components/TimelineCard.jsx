import Image from "next/image";
import callIcon from "@/assets/call.png";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";
import meetupIcon from "@/assets/logo.png";

const iconMap = {
  Call: callIcon,
  Text: textIcon,
  Video: videoIcon,
  Meetup: meetupIcon,
};

const TimelineCard = ({ item }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-3">
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={iconMap[item.type] || textIcon}
          alt={item.type}
          className="object-contain"
        />
      </div>
      <div>
        <h3 className="text-[15px] font-medium text-slate-800">
          <span className="font-bold">{item.type}</span>{" "}
          <span className="text-slate-500 font-normal">with</span>{" "}
          <span className="text-slate-600 font-semibold">{item.person}</span>
        </h3>
        <p className="text-xs text-slate-400 font-medium">{item.date}</p>
      </div>
    </div>
  );
};

export default TimelineCard;