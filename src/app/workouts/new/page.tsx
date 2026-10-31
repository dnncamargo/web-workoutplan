import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata = { title: "Nova ficha" };

export default function NewWorkoutPage() {
  return (
    <PlaceholderPage
      eyebrow="FICHAS DE TREINO"
      title="Nova ficha"
      description="A criação de fichas será implementada com seleção muscular, montagem manual ou sugestões assistidas por IA."
      icon="plus"
    />
  );
}
