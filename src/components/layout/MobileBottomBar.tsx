import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { phoneHref, whatsappHref } from "@/config/site";

export function MobileBottomBar() {
  return (
<div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2 p-2">
        <Button href={phoneHref}>
          <Phone size={20} aria-hidden="true" />
          Позвонить
        </Button>
        <Button
          href={whatsappHref}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={20} className="text-[#128C7E]" aria-hidden="true" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}