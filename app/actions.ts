"use server";

export async function sendLangflowMessage(message: string, sessionId: string) {
  const FLOW_ID = "e93ad28e-e445-45d3-80a8-d86377b1e9c3";
  const API_KEY = process.env.LANGFLOW_API_KEY; // Store this in your .env file
  const ENDPOINT = `http://192.168.10.21:7860/api/v1/run/${FLOW_ID}`;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "",
      },
      body: JSON.stringify({
        input_value: message,
        input_type: "chat",
        output_type: "chat",
        session_id: sessionId,
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch from Langflow");

    const data = await response.json();

    // Path to extract text: outputs[0].outputs[0].results.message.text
    return (
      data.outputs[0]?.outputs[0]?.results?.message?.text ||
      "No response received."
    );
  } catch (error) {
    console.error(error);
    return "Errore: Impossibile connettersi all'IA.";
  }
}
