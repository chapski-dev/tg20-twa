import * as S from './style'


type Option = {
    value: string,
    label: string
}
type SelectProps = {
    onChange: (element: Option) => void,
    options: Array<Option>
    value: Option
}
export const Select = (props: SelectProps) => {
    const { options, onChange, value } = props;

    const onChangeFunction = (element: Option) => {
        onChange?.(element);
    }

    return (
        <S.StyledSelect
            defaultValue={options[0]}
            isSearchable={true}
            value={value}
            className="select-container"
            classNamePrefix="select"
            name="color"
            onChange={onChangeFunction as any}
            options={options}
        />
    );

};