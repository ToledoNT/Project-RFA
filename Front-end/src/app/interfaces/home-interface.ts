export interface RifaButtonProps {
    numero: number;
    comprado: boolean;
    onClick: () => void;
  }
export interface IsearchRaffle {
  email: string;
}

export interface RifaNumbersResponse {
  numerosDisponiveis: number[];
  numerosComprados: number[];
}

export interface Rifa {
  id: string;
  number: number;
  status: string;
}

export interface RifasPainelProps {
  rifasDisponiveis: Rifa[];
  rifasCompradas: number[];
  mostrarDisponiveis: boolean;
  setMostrarDisponiveis: (mostrar: boolean) => void;
  comprarRifa: (numero: number) => void;
}

export interface RifaBuyUserRaflle { 
id: string
email: string
}