import { NextRequest, NextResponse } from "next/server";

const CULQI_API = "https://api.culqi.com/v2";

interface ChargeBody {
  token_id: string;
  plan_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.CULQI_SECRET_KEY;
    if (!secretKey || secretKey.includes("XXXX_REEMPLAZA")) {
      return NextResponse.json(
        { error: "Culqi no está configurado. Contacta al administrador." },
        { status: 503 }
      );
    }

    const body: ChargeBody = await req.json();
    const { token_id, plan_id, email, first_name, last_name, phone, metadata } = body;

    // Validaciones basicas
    if (!token_id || !plan_id || !email) {
      return NextResponse.json(
        { error: "Faltan datos requeridos: token_id, plan_id, email" },
        { status: 400 }
      );
    }

    // ---- Paso 1: Crear cliente en Culqi ----
    const customerRes = await fetch(`${CULQI_API}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        first_name: first_name || "Suscriptor",
        last_name: last_name || "IPF",
        email,
        phone_number: phone || undefined,
        metadata: metadata || {},
      }),
    });

    const customerData = await customerRes.json();

    if (!customerRes.ok || customerData.object === "error") {
      console.error("[Culqi] Error creando cliente:", customerData);
      return NextResponse.json(
        {
          error: customerData.user_message || "Error al registrar cliente en Culqi",
        },
        { status: 400 }
      );
    }

    const customerId = customerData.id;

    // ---- Paso 2: Crear tarjeta (card) con el token ----
    const cardRes = await fetch(`${CULQI_API}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        customer_id: customerId,
        token_id,
      }),
    });

    const cardData = await cardRes.json();

    if (!cardRes.ok || cardData.object === "error") {
      console.error("[Culqi] Error creando tarjeta:", cardData);
      return NextResponse.json(
        {
          error: cardData.user_message || "Error al procesar la tarjeta",
        },
        { status: 400 }
      );
    }

    const cardId = cardData.id;

    // ---- Paso 3: Crear suscripcion al plan ----
    const subRes = await fetch(`${CULQI_API}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        card_id: cardId,
        plan_id,
        metadata: {
          ...(metadata || {}),
          customer_email: email,
          source: "web_ipf",
        },
      }),
    });

    const subData = await subRes.json();

    if (!subRes.ok || subData.object === "error") {
      console.error("[Culqi] Error creando suscripcion:", subData);
      return NextResponse.json(
        {
          error: subData.user_message || "Error al crear la suscripcion",
        },
        { status: 400 }
      );
    }

    // ---- Exito ----
    console.log("[Culqi] Suscripcion creada:", {
      subscriptionId: subData.id,
      planId: plan_id,
      customerId,
      email,
    });

    return NextResponse.json({
      success: true,
      subscription_id: subData.id,
      plan_id,
      customer_id: customerId,
      status: subData.status,
      message: "Suscripcion creada exitosamente",
    });
  } catch (error) {
    console.error("[Culqi] Error interno:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
