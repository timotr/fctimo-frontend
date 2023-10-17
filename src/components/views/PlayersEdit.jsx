import { Button, Select, TextInput } from "@mantine/core";
import useGlobalState from "../hooks/useGlobalState";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import useSWR from "swr";

export default function PlayersEdit({ params }) {
    const setActionBarTitle = useGlobalState((state) => state.setActionBarTitle);
    const addActionBarButton = useGlobalState((state) => state.addActionBarButton);
    const removeActionBarButton = useGlobalState((state) => state.removeActionBarButton);
    const isNew = (params?.id) === undefined || params?.id === 'new';

    const { data: teams, error } = useSWR('/api/teams', {
        fallbackData: [
            { id: -1, name: "U9" },
            { id: -2, name: "U10" },
            { id: -3, name: "U16" },
            { id: -4, name: "U18" },
        ],
    });

    
    const teamsOptions = teams.map(team => ({ value: team.id.toString(), label: team.name }));

    const form = useForm({
        initialValues: {
            name: '',
            team: '',
            guardian: '',
        },
        validationRules: {
            name: (value) => value.trim().length > 0,
        },
    });

    const handleSubmit = (values) => {
        console.log("handleSubmit", values)
    }

    useEffect(() => {
        setActionBarTitle(isNew ? 'Create new player' : "Edit player");
        addActionBarButton('save', <Button
            key="players-edit-save"
            variant={form.isDirty() ? "filled" : "outline"}
            onClick={form.onSubmit(handleSubmit)}>
            Save
        </Button>);
        return () => {
            setActionBarTitle('');
            removeActionBarButton('save');
        }
    }, [setActionBarTitle, addActionBarButton, removeActionBarButton, form, form.isDirty(), isNew]);

    return <div>
        <TextInput {...form.getInputProps('name')} label="Full name" />
        <Select {...form.getInputProps('team')} label="Team" data={teamsOptions} />
        <TextInput {...form.getInputProps('guardian')} label="Search for guardian" />
    </div>
}