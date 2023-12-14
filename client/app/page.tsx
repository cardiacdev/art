import { siteConfig } from "../config/site";

export default function Hero() {
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>
        <h2 className="text-lg font-extrabold leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-4xl">
          Die zentrale Auftrags- und Rechnungsverwaltung
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Optimieren Sie Ihr Geschäftsmanagement mit ART, um die Verfolgung von Bestellungen und Rechnungen zu
          vereinfachen und so eine reibungslose Kontrolle sowie Echtzeit-Einblicke zu ermöglichen.
        </p>
        <p className="text-muted-foreground text-xs pt-6">
          Dies ist eine Demo-Version. Bitte geben Sie keine sensiblen Daten ein. Die Datenbank wird alle 24
          Stunden zurückgesetzt.{" "}
        </p>
      </div>
    </main>
  );
}
