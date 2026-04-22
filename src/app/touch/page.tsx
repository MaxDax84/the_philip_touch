import InsultMachine from "@/app/InsultMachine";

export const dynamic = "force-dynamic";

export default function TouchPage() {
  const hasApi = !!process.env.GEMINI_API_KEY;
  return <InsultMachine hasApi={hasApi} />;
}
