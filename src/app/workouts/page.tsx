import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { PlaceholderPage } from "@/components/layout/placeholder-page";
import styles from "./workouts.module.css";

export const metadata = { title: "Fichas de treino" };

export default function WorkoutsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div className={styles.headerSpacer}>
          <PlaceholderPage
            eyebrow="PLANEJAMENTO"
            title="Fichas de treino"
            description="Crie sessões por grupos musculares, combine exercícios e configure suas técnicas de execução."
            icon="layers"
          />
        </div>
        <Link className={styles.createButton} href="/workouts/new">
          <Icon name="plus" size={16} />
          Nova ficha
        </Link>
      </div>
    </div>
  );
}
