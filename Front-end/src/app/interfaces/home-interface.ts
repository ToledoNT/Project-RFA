
  export interface RifaButtonProps {
    numero: number;
    comprado: boolean;
    onClick: () => void;
  }


export interface RifasPainelProps {
  rifasDisponiveis: number[];
  rifasCompradas: number[];
  mostrarDisponiveis: boolean;
  setMostrarDisponiveis: (mostrar: boolean) => void;
  comprarRifa: (numero: number) => void;
}