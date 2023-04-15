export default function Home() {
  return (
    <main className="mx-8 border p-4">
      <section className="pt-10">
        <div className="text-7xl text-center mb-8">
          Knight <br />
          Hacks
        </div>
        <div className="flex flex-col gap-2">
          <button className="border font-bold py-4">Register</button>
          <button className="border font-bold py-4">Sponsor Us</button>
          <button className="border font-bold py-4">Discord</button>
        </div>
      </section>
    </main>
  );
}
