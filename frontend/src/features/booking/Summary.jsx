import { useQuery } from "@tanstack/react-query";
import { WORKSHOP } from "@/config/workshop";
import { getWorkshop } from "@/lib/api/workshop";

export function Summary() {
  const { data } = useQuery({
    queryKey: ["workshop", WORKSHOP.slug],
    queryFn: () => getWorkshop(WORKSHOP.slug),
  });

  const amount = data?.active_price?.amount ?? WORKSHOP.pricing.early.amount;
  const regular = data?.regular_price ?? WORKSHOP.pricing.regular.amount;

  return (
    <div className="summary" data-testid="booking-summary">
      <div className="summary-info">
        <h3>Körperintelligenz</h3>
        <p>Sa, 4. Juli 2026 · 10–14 Uhr</p>
        <p>Naturplatz Draußen Zuhause, Schledehausen</p>
      </div>
      <div className="summary-price">
        <p className="amount" data-testid="summary-price">
          {amount} €
        </p>
        <p className="meta">Frühbucher bis 26.6.</p>
        <p className="meta">danach {regular} €</p>
      </div>
    </div>
  );
}
