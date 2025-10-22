import { User } from "@/lib/features/user/userSlice";
import { MapPin, CalendarClock } from "lucide-react";
import React from "react";

const CeremonyInfo = ({ user }: { user: User }) => {
  const group = user.group;

  let weddingDate: Date;
  let weddingAddress: string;
  let weddingMapsLink: string;
  let weddingDateString: string;
  let weddingTimeString: string;

  switch (group) {
    case 1:
      weddingDate = new Date("2025-12-21T15:00:00");
      weddingAddress = "Condomínio Chácara Graciosa II - Salão de Festas";
      weddingMapsLink =
        "https://www.google.com/maps/place/Condomínio+Chácara+Graciosa+II/@-25.4083297,-49.2621764,17z/data=!3m1!4b1!4m6!3m5!1s0x94dce420c1136a79:0x540f7b33f0b32c2a!8m2!3d-25.4083346!4d-49.2596015!16s%2Fg%2F1tg36cgt?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
      weddingDateString = "21 de Dezembro de 2025";
      weddingTimeString = "15:00";
      break;
    case 2:
      weddingDate = new Date("2026-01-09T13:00:00");
      weddingAddress = "Festejar Eventos Ampére";
      weddingMapsLink =
        "https://www.google.com/maps/place/Festejar+Eventos+Ampére/@-25.9270474,-53.4950983,17z/data=!3m1!4b1!4m6!3m5!1s0x94f0f18942f8f0bf:0xf98b0577d44f61f7!8m2!3d-25.9270522!4d-53.4925234!16s%2Fg%2F11jznycl8l?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
      weddingDateString = "9 de Janeiro de 2026";
      weddingTimeString = "15:00";
      break;
    case 3:
      weddingDate = new Date("2026-01-11T13:00:00");
      weddingAddress = "Festejar Eventos Ampére";
      weddingMapsLink =
        "https://www.google.com/maps/place/Festejar+Eventos+Ampére/@-25.9270474,-53.4950983,17z/data=!3m1!4b1!4m6!3m5!1s0x94f0f18942f8f0bf:0xf98b0577d44f61f7!8m2!3d-25.9270522!4d-53.4925234!16s%2Fg%2F11jznycl8l?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
      weddingDateString = "11 de Janeiro de 2026";
      weddingTimeString = "15:00";
      break;
    case 4:
      weddingDate = new Date("2026-01-17T15:00:00");
      weddingAddress = "Edificio Central Station - Area Gourmet";
      weddingMapsLink =
        "https://www.google.com/maps/place/Edifício+Central+Station/@-25.4364311,-49.272139,17z/data=!3m1!4b1!4m6!3m5!1s0x94dce5001ae90f59:0xc715e4154cc0138!8m2!3d-25.436436!4d-49.2695641!16s%2Fg%2F11w_rvbp5n?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
      weddingDateString = "17 de Janeiro de 2026";
      weddingTimeString = "15:00";
      break;
    default:
      weddingDate = new Date("2025-12-21T15:00:00");
      weddingAddress = "Condomínio Chácara Graciosa II - Salão de Festas";
      weddingMapsLink =
        "https://www.google.com/maps/place/Condomínio+Chácara+Graciosa+II/@-25.4083297,-49.2621764,17z/data=!3m1!4b1!4m6!3m5!1s0x94dce420c1136a79:0x540f7b33f0b32c2a!8m2!3d-25.4083346!4d-49.2596015!16s%2Fg%2F1tg36cgt?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
      weddingDateString = "21 de Dezembro de 2025";
      weddingTimeString = "15:00";
  }

  return (
    <div className="bg-black text-white">
      <div className="max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:justify-between md:gap-24 py-12 px-6">
        <div className="flex items-start gap-4">
          <MapPin className="h-8 w-8 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-300">
              Local da Cerimônia
            </h3>
            <p className="mt-1 text-base md:text-lg text-white">
              {weddingAddress}
            </p>
            <a
              href={weddingMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors w-fit"
            >
              Ver no mapa →
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <CalendarClock className="h-8 w-8 text-gray-400 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-300">
              Data e Horário
            </h3>
            <p className="mt-1 text-base md:text-lg text-white">
              {weddingDateString}
            </p>
            <p className="text-base md:text-lg text-white">
              às {weddingTimeString}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeremonyInfo;
