import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useField } from 'formik'
import * as S from './style'
import { SvgExit, SvgPlus } from 'ui/icons'

type FormInputProps = {
    name: string
    error?: boolean
    label?: string
}

export const ImageInput: FC<FormInputProps> = (props) => {
    const { name, error, label } =
        props
    const [field, meta, helpers] = useField(name)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return;

        const file = URL.createObjectURL(e.target.files[0]);
        helpers.setValue(file)
    }

    return (
        <S.Container>
            <S.Label error={error || meta.error !== undefined}>{label}</S.Label>
            <S.Wrapper>
                <S.Input isImage={field.value} onChange={event => handleChange(event)} name='file' type='file' />
                {field.value && (
                    <>
                        <S.Image src={field.value} alt='image' />
                        <SvgExit onClick={() => helpers.setValue('')} />
                    </>
                )}
                {!field.value && (
                    <S.Flex>
                        <SvgPlus />
                        <S.Title>Upload</S.Title>
                    </S.Flex>
                )}
            </S.Wrapper>
            <S.ErrorMessage>{meta.error}</S.ErrorMessage>
        </S.Container>

    )
}
