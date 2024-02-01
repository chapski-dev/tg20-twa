import { ReactNode, useState } from 'react';
import * as S from './style';

type AccordionProps = {
    title: string,
    children: ReactNode,
    height: string,
    className?: string
};

export const Accordion = (props: AccordionProps) => {
    const { title, children, height, className } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <S.Wrapper className={className} isOpen={isOpen}>
            <S.Container onClick={() => setIsOpen((prev) => !prev)} >
                <S.Title >{title}</S.Title>
                <S.Icon isOpen={isOpen} />
            </S.Container>

            <S.Content myHeight={height} isOpen={isOpen}>
                {children}
            </S.Content>
        </S.Wrapper >
    )
}