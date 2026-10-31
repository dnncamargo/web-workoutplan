import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>SEU ESPAÇO DE TREINAMENTO</span>
        <h1>Hoje</h1>
        <p>Planeje, execute e acompanhe seu treinamento no seu próprio ritmo.</p>
      </header>

      <section className={styles.todayCard} aria-labelledby="today-title">
        <div className={styles.todayContent}>
          <div className={styles.cardLabel}>
            <Icon name="calendar" size={15} />
            <span>TREINO DO DIA</span>
          </div>
          <h2 id="today-title">Seu próximo treino começa aqui.</h2>
          <p>
            Quando você programar uma sessão no calendário, ela aparecerá aqui
            para facilitar o início e o registro do treino.
          </p>
          <Link className={styles.primaryButton} href="/calendar">
            Ver calendário
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className={styles.todayArtwork} aria-hidden="true">
          <div className={styles.artworkCircle}>
            <Icon name="dumbbell" size={58} strokeWidth={1.35} />
          </div>
          <span className={styles.artworkCaption}>CONSISTÊNCIA</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="shortcuts-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>COMECE POR AQUI</span>
            <h2 id="shortcuts-title">Acesso rápido</h2>
          </div>
        </div>

        <div className={styles.shortcutGrid}>
          <Link className={styles.shortcutCard} href="/workouts">
            <span className={styles.shortcutIcon}><Icon name="layers" size={21} /></span>
            <span className={styles.shortcutText}>
              <strong>Minhas fichas</strong>
              <small>Organize suas sessões e combinações de exercícios.</small>
            </span>
            <Icon name="chevronRight" size={17} className={styles.shortcutArrow} />
          </Link>

          <Link className={styles.shortcutCard} href="/exercises">
            <span className={styles.shortcutIcon}><Icon name="dumbbell" size={21} /></span>
            <span className={styles.shortcutText}>
              <strong>Biblioteca de exercícios</strong>
              <small>Explore movimentos, músculos e orientações.</small>
            </span>
            <Icon name="chevronRight" size={17} className={styles.shortcutArrow} />
          </Link>

          <Link className={styles.shortcutCard} href="/history">
            <span className={styles.shortcutIcon}><Icon name="chart" size={21} /></span>
            <span className={styles.shortcutText}>
              <strong>Minha evolução</strong>
              <small>Acompanhe seu histórico e volume muscular.</small>
            </span>
            <Icon name="chevronRight" size={17} className={styles.shortcutArrow} />
          </Link>
        </div>
      </section>

      <section className={styles.noteCard}>
        <div className={styles.noteIcon}><Icon name="sparkles" size={19} /></div>
        <div>
          <strong>Treinamento com informação</strong>
          <p>
            A biblioteca e as orientações serão organizadas para ajudar você a
            entender cada exercício e acompanhar sua execução.
          </p>
        </div>
      </section>
    </div>
  );
}
