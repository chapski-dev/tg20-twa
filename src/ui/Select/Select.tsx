import * as S from './style';

type Option = {
  value: string;
  label: string;
};
type SelectProps = {
  onChange: (element: Option) => void;
  options: Array<Option>;
  value: Option;
};
export const Select = (props: SelectProps) => {
  const { options, onChange, value } = props;

  const onChangeFunction = (element: Option) => {
    onChange?.(element);
  };

  return (
    <S.Select
      className="select-container"
      classNamePrefix="select"
      defaultValue={options[0]}
      isSearchable={true}
      name="color"
      onChange={onChangeFunction as any}
      options={options}
      value={value}
    />
  );
};
