export interface InputDropDownOption {
  label: string;
  value: string;
  img?: string;
}

export interface InputProps {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  name: string;
  id?: string;
  label?: string;
  value?: Date | string | number;
  onChange?: (event: React.ChangeEvent<{ name?: string; value: string }>) => void;
  onClear?: (options: InputDropDownOption[]) => void;
  onInput?: (event: Event) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: string | boolean;
  className?: string;
  testId?: string;
  loading?: boolean;
  options?: InputDropDownOption[];
  onClickOption?: (option: InputDropDownOption) => void;
  leftIcon?: any;
  disabled?: boolean;
}
