export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  isFlag?: boolean;
  flagArray?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string; // <-- añade esto!
  sticky?: 'left' | 'right'; // NUEVO!
}


