import { MovieCard } from "@/widgets";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section className="grid grid-cols-4 gap-6 p-6">
        <MovieCard />
      </section>
    </div>
  );
}
