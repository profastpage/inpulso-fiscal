import { NextRequest, NextResponse } from "next/server";

/*
 * Webhook de Culqi
 * Configurado en: culqipanel.culqi.com > INSTITUTO PULSO FISCAL > Desarrolladores > Webhooks
 * URL: https://inpulso-fiscal.vercel.app/api/culqi/webhook
 *
 * Evento configurado:
 *   Producto: CulqiOnline | Recurso: subscription | Accion: charge | Resultado: succeeded
 *   (tipo de evento: "subscription.charge.succeeded")
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Culqi envia el tipo de evento en body.type
    // Formato: "subscription.charge.succeeded"
    const eventType = body.type || "";
    const eventData = body.data || body;

    console.log("=== [Culqi Webhook] ===");
    console.log("Tipo de evento:", eventType);
    console.log("Data:", JSON.stringify(eventData, null, 2));

    // ---- Evento principal que configuraste ----
    if (eventType === "subscription.charge.succeeded") {
      const charge = eventData;

      console.log("[Culqi] SUSCRIPCION PAGADA EXITOSAMENTE");
      console.log({
        charge_id: charge.id,
        subscription_id: charge.subscription_id,
        amount: charge.amount,
        currency: charge.currency_code,
        email: charge.email || charge.customer_email,
        plan_id: charge.plan_id,
        creation_date: charge.creation_date,
      });

      // === AQUI IMPLEMENTAS TU LOGICA DE NEGOCIO ===
      // 1. Guardar en base de datos la suscripcion activa
      // 2. Enviar email de bienvenida al cliente
      // 3. Activar acceso al contenido premium
      // 4. Registrar el comprobante de pago
     
      return NextResponse.json({ received: true, event: eventType });
    }

    // Otros eventos (por si agregas mas webhooks en el futuro)
    if (eventType.includes("subscription") || eventType.includes("charge")) {
      console.log("[Culqi] Evento recibido (no procesado):", eventType);
    }

    // Siempre responder 200 OK rapido para que Culqi no reintente
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Culqi Webhook] Error:", error);
    // Incluso en error, responder 200 para evitar reintentos de Culqi
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

// Culqi envia un GET para verificar que la URL del webhook esta activa
export async function GET() {
  return NextResponse.json({ status: "active" });
}
