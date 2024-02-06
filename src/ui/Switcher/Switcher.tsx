import { ChangeEvent, FC } from 'react';
import * as S from './style';

type SwitcherProps = {
    values: [string, string];
    checked: string;
    title: string
    onChange: (value: string) => void
}
export const Switcher: FC<SwitcherProps> = (props) => {
    const { values, checked, title, onChange } = props;

    const handleChange = () => {
        const newValue = checked.toLowerCase() === values[0].toLowerCase() ?
            values[1].toLowerCase() : values[0].toLowerCase();
        onChange(newValue);

    }

    return (
        <S.Container>
            <S.Title>{title}</S.Title>
            <>
                <S.Input onChange={handleChange} checked={checked.toLowerCase() === values[1].toLowerCase()} id='checkbox' type='checkbox' />
                <S.ToggleContainer htmlFor='checkbox'>
                    {values.map((value) => <div key={value}>{value}</div>)}
                </S.ToggleContainer >
            </>
        </S.Container>

    );
}