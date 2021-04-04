export interface SearchProps {
  onClickResults?: (search: string) => void;
  onClear?: () => void;
  onClickOption?: (option) => void;
  loading?: boolean;
}
