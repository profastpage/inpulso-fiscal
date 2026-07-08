"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/51943279673"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="whatsapp-fab hidden md:flex"
    >
      <MessageCircle className="w-7 h-7" fill="white" />
    </a>
  );
}