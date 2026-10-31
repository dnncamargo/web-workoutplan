"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import styles from "./app-shell.module.css";

const navigation: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/", label: "Hoje", icon: "home" },
  { href: "/calendar", label: "Calendário", icon: "calendar" },
  { href: "/workouts", label: "Fichas", icon: "layers" },
  { href: "/exercises", label: "Exercícios", icon: "dumbbell" },
  { href: "/history", label: "Evolução", icon: "chart" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Navegação principal">
        <Link className={styles.brand} href="/" aria-label="WorkoutPlan — Hoje">
          <span className={styles.brandMark}>W</span>
          <span className={styles.brandText}>
            <strong>WorkoutPlan</strong>
            <small>Treinamento pessoal</small>
          </span>
        </Link>

        <div className={styles.navSectionLabel}>MEU TREINO</div>
        <nav className={styles.navList}>
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.navLinkActive : styles.navLink}
                aria-current={active ? "page" : undefined}
              >
                <Icon name={item.icon} size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarFooterIcon}>
            <Icon name="activity" size={17} />
          </div>
          <div>
            <strong>Seu ritmo, sua evolução.</strong>
            <span>Um treino de cada vez.</span>
          </div>
        </div>
      </aside>

      <div className={styles.contentColumn}>
        <header className={styles.topbar}>
          <Link className={styles.mobileBrand} href="/">
            <span className={styles.brandMark}>W</span>
            <strong>WorkoutPlan</strong>
          </Link>
          <div className={styles.topbarContext}>ESPAÇO PESSOAL</div>
          <Link
            href="/settings"
            className={styles.settingsLink}
            aria-label="Configurações"
            title="Configurações"
          >
            <Icon name="settings" size={19} />
          </Link>
        </header>

        <main className={styles.main}>{children}</main>
      </div>

      <nav className={styles.mobileNavigation} aria-label="Navegação principal">
        {navigation.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? styles.mobileNavLinkActive : styles.mobileNavLink}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
