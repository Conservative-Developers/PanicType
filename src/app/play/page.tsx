import TypingGame from "@/components/TypingGame";

export const metadata = {
  title: "Play — PanicType",
  description: "Test your typing speed now!",
};

export default function PlayPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Type it out</h1>
        <p className="text-gray-500 text-sm">
          Type the text below as fast and accurately as you can
        </p>
      </div>
      <TypingGame />
    </div>
  );
}
