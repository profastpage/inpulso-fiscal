import { NextRequest, NextResponse } from "next/server";

/*
 * Webhook de Culqi
 * Configura esta URL en: https://culqipanel.culqi.com > Comercio > Desarrolladores > Webhooks
 * URL: https://inpulso-fiscal.vercel.app/api/culqi/webhook
 *
 * Eventos que debes activar en Culqi:
 *   - subscription.created
 *   - subscription.deleted
 *   - charge.succeeded
 *   - charge.failed
 */

// Eventos de Culqi que nos interesan
const VALID_EVENTS = [
  "subscription.created",
  "subscription.paused",
  "subscription.deleted",
  "charge.succeeded",
  "charge.failed",
  "charge.refunded",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.object || body.type;
    const eventData = body.data || body;

    console.log("[Culqi Webhook] Evento recibido:", eventType);
    console.log("[Culqi Webhook] Data:", JSON.stringify(eventData, null, 2));

    // Validar que es un evento que procesamos
    if (!VALID_EVENTS.includes(eventType)) {
      console.log("[Culqi Webhook] Evento ignorado:", eventType);
      return NextResponse.json({ received: true });
    }

    // ---- Procesar segun tipo de evento ----
    switch (eventType) {
      case "subscription.created": {
        const sub = eventData;
        console.log("[Culqi] Nueva suscripcion:", {
          id: sub.id,
          plan_id: sub.plan_id,
          status: sub.status,
          creation_date: sub.creation_date,
        });
        // Aqui puedes:
        // - Guardar en base de datos
        // - Enviar email de bienvenida
        // - Activar acceso al contenido premium
        break;
      }

      case "subscription.paused": {
        console.log("[Culqi] Suscripcion pausada:", eventData.id);
        // Desactivar acceso premium
        break;
      }

      case "subscription.deleted": {
        console.log("[Culqi] Suscripcion cancelada:", eventData.id);
        // Remover acceso premium
        break;
      }

      case "charge.succeeded": {
        const charge = eventData;
        console.log("[Culqi] Cargo exitoso:", {
          id: charge.id,
          amount: charge.amount,
          currency: charge.currency_code,
          email: charge.email,
        });
        // Registrar pago, enviar comprobante
        break;
      }

      case "charge.failed": {
        console.log("[Culqi] Cargo fallido:", eventData.id);
        // Notificar al usuario, ofrecer reintentar
        break;
      }

      case "charge.refunded": {
        console.log("[Culqi] Reembolso:", eventData.id);
        // Desactivar acceso, registrar devolucion
        break;
      }
    }

    // Siempre responder 200 rapidamente para que Culqi no reintente
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Culqi Webhook] Error:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

// Culqi envia un GET para verificar la URL del webhook
export async function GET() {
  return NextResponse.json({ status: "active" });
}
