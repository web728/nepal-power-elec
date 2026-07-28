import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sectors } from "@/lib/content/sectors";

export function SectorsGrid() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Product Categories" title="Explore the Main Sectors" />
          <Button href="/exhibitor-categories" variant="outline" size="sm" className="hidden sm:inline-flex">
            View All Categories
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Link key={sector.slug} href="/exhibitor-categories" className="block h-full">
              <Card className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-lg text-ink">{sector.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {sector.items.slice(0, 3).join(", ")}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-dark">
                  View category <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <Button href="/exhibitor-categories" variant="outline" size="sm" className="mt-8 w-full sm:hidden">
          View All Categories
        </Button>
      </Container>
    </section>
  );
}
