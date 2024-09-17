
import React from "react";
import { useFormState } from "react-dom";
import { Stack } from "@chakra-ui/react";
import AppModal, { type AppModalProps } from "@/components/modal";
import type { ActionProps, VehicleEntity } from "@/utils/interfaces";
import AppForm from "@/components/form";
import AppInput from "@/components/input";
import { createOrUpdateVehicle } from "./actions";
import AppSelect from "@/components/select";

export interface VehicleEditionModalProps extends Omit<AppModalProps, "children">{
    selectedVehicle?: VehicleEntity
}

const vehicleDefault: VehicleEntity = {
    plate: "",
    type: "bus"
}

export function VehicleEditionModal({
    selectedVehicle,
    onClose,
    ...props
}: VehicleEditionModalProps): React.ReactElement{
    const [formState, formAction] = useFormState<ActionProps, FormData>(createOrUpdateVehicle, { finish: false });

    const [vehicleState, setVehicleState] = React.useState<VehicleEntity>(vehicleDefault);

    const buttonConfirmDescription: string = React.useMemo<string>(()=> {
        return vehicleState.uuid ? "Alterar" : "Cadastrar";
    }, [vehicleState])

    React.useEffect(()=> {

        setVehicleState(selectedVehicle || vehicleDefault);
    }, [selectedVehicle]);

    React.useEffect(()=> {
        if(formState.finish)
            onClose();

    }, [formState, onClose]);

    return (
        <AppModal
            onClose={onClose}
            buttonsProps={{
                buttonConfirmDescription,
                buttonConfirmProps: {
                    type: "submit"
                }
            }}
            {...props}
        >
            <AppForm action={formAction}>
                <Stack
                    width="full"
                    spacing={5}
                >
                    <AppInput 
                        type="text"
                        label="Placa"
                        name="plate"
                        variant="filled"
                        color="secondary"
                        value={vehicleState.plate}
                    />
                    <AppSelect
                        items={[
                            {
                                description: "Carro",
                                value: "car"
                            },
                            {
                                description: "Moto",
                                value: "motorcycle"
                            },
                            {
                                description: "Ônibos",
                                value: "bus"
                            }
                        ]}
                        label="Email"
                        name="email"
                        variant="filled"
                        color="secondary"
                        value={vehicleState.type}                            
                    />
                </Stack>
            </AppForm>
        </AppModal>
    )
}