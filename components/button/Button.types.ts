export interface ButtonProps {
  children: React.ReactNode | React.ReactNode[] | string;
  type: 'button' | 'submit';
  onClick?: (event?: React.ChangeEvent<any>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  testId?: string;
}
