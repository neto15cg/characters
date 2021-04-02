export interface OptionType {
  value: string | number;
  label?: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface SelectProps {
  options: OptionType[];
  name: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  id?: string;
  value?: string | number;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: object) => void;
  className?: string;
  testId?: string;
  error?: string | boolean;
  disabled?: boolean;
}
