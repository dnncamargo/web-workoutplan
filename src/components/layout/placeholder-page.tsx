import { EmptyState } from "@/components/ui/empty-state";
import type { IconName } from "@/components/ui/icon";
import styles from "./placeholder-page.module.css";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
};

export function PlaceholderPage({ eyebrow, title, description, icon }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <EmptyState
        icon={icon}
        title="Esta área está sendo preparada"
        description="A estrutura visual já está pronta. As funcionalidades e os dados serão implementados nos próximos incrementos."
      />
    </div>
  );
}
