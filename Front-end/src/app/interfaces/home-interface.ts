
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

export interface RifaNumbersResponse {
  numerosDisponiveis: number[];
  numerosComprados: number[];
}

export interface IsearchRaffle {
  email: string;
}
