import { OptionType } from '../../components/select/Select.types';

export const OptionsFilter: OptionType[] = [
  { label: 'Unknown', value: 0 },
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
];

export const renderGender = (gender: number) => {
  if (gender === 1) {
    return 'Male';
  }
  if (gender === 2) {
    return 'Female';
  }
  return 'Unknown';
};
