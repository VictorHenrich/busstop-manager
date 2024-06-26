import React from "react"
import {
    Stack,
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalOverlay,
    ModalCloseButton,
    ModalBodyProps,
    ModalHeaderProps,
    ModalFooterProps,
    ModalProps,
    ButtonProps
} from "@chakra-ui/react";
import AppButton from "../button";


export interface AppButtonModalProps{
    onConfirm?: () => void,
    onCancel?: ()=> void,
    buttonConfirmDescription?: string,
    buttonCancelDescription?: string,
    buttonConfirmProps?: ButtonProps,
    buttonCancelProps?: ButtonProps
}

export interface AppModalProps extends Omit<ModalProps, "isOpen">{
    open: boolean,
    title?: string,
    headerProps?: Partial<ModalHeaderProps>,
    bodyProps?: Partial<ModalBodyProps>,
    footerProps?: Partial<ModalFooterProps>,
    buttonsProps?: AppButtonModalProps,
}

export default function AppModal({
    open,
    onClose,
    bodyProps = {},
    footerProps = {},
    headerProps = {},
    buttonsProps: buttonsParams = {},
    title = "",
    children,
    ...props
}: AppModalProps): React.ReactElement{
    const buttonsProps = React.useMemo<AppButtonModalProps>(()=> {
        return {
            buttonCancelDescription: "Cancelar",
            buttonConfirmDescription: "Confirmar",
            onCancel: onClose,
            onConfirm: ()=> undefined,
            buttonCancelProps: {},
            buttonConfirmProps: {},
            ...buttonsParams,
        }
    }, [buttonsParams, onClose]);


    const handleClickButtonConfirm = React.useMemo<()=> void>(()=> {
        if(!buttonsProps.onConfirm)
            return () => undefined

        return buttonsProps.onConfirm;
    }, [buttonsProps]);


    const handleClickButtonCancel = React.useMemo<()=> void>(()=> {
        if(!buttonsProps.onCancel)
            return () => undefined

        return buttonsProps.onCancel;
    }, [buttonsProps]);

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            size="xl"
            {...props}
        >
            <ModalOverlay />
            <ModalContent
                backgroundColor="secondary"
            >
                <ModalCloseButton color="primary"/>
                <ModalHeader 
                    {...headerProps}
                    color="tertiary"
                    fontFamily="var(--font-titles)"
                    fontSize={25}
                >
                    {title}
                </ModalHeader>
                <ModalBody {...bodyProps}>
                    {children}
                </ModalBody>
                <ModalFooter {...footerProps}>
                    <Stack
                        direction="row"
                        spacing={5}
                    >
                        <AppButton 
                            backgroundColor="primary"
                            color="tertiary"
                            _hover={{
                                backgroundColor: "tertiary",
                                color: "secondary"
                            }}
                            {...buttonsProps.buttonConfirmProps}
                            onClick={handleClickButtonConfirm}
                        >
                            {buttonsProps.buttonConfirmDescription}
                        </AppButton>
                        <AppButton 
                            backgroundColor="red"
                            color="tertiary"
                            _hover={{
                                backgroundColor: "tertiary",
                                color: "secondary"
                            }}
                            onClick={handleClickButtonCancel}
                            {...buttonsProps.buttonCancelProps}
                        >
                            {buttonsProps.buttonCancelDescription}
                        </AppButton>
                        </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}