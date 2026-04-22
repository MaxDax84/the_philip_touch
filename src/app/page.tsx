import InsultMachine from "@/app/InsultMachine";

export default function Home() {
  const hasApi = !!process.env.GEMINI_API_KEY;
  return <InsultMachine hasApi={hasApi} />;
}
