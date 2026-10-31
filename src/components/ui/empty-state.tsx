import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import styles from "@/components/layout/placeholder-page.module.css";

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <Icon name={icon} size={25} strokeWidth={1.7} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel && actionHref ? (
        <Link className={styles.emptyAction} href={actionHref}>
          {actionLabel}
          <Icon name="arrowRight" size={16} />
        </Link>
      ) : null}
    </div>
  );
}
