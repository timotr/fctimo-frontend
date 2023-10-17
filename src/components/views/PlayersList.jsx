import { Button, Table } from "@mantine/core";
import useGlobalState from "../hooks/useGlobalState";
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayersList() {
    const setActionBarTitle = useGlobalState((state) => state.setActionBarTitle);
    const addActionBarButton = useGlobalState((state) => state.addActionBarButton);
    const removeActionBarButton = useGlobalState((state) => state.removeActionBarButton);
    const navigate = useNavigate();

    const { data, error } = useSWR('/api/players', {
        fallbackData: [
            { name: "John Doe", team: "U9", guardian: "Jane Doe", guardianPhone: "555-555-5555" },
            { name: "Kalle Ain", team: "U9", guardian: "Tiina Ain", guardianPhone: "555-556-5556" },
            { name: "Mait Endel", team: "U9", guardian: "Johannes Endel", guardianPhone: "555-557-5567" },
            { name: "Vello Ain", team: "U9", guardian: "Tiina Ain", guardianPhone: "555-556-5556" },
        ],
    });

    useEffect(() => {
        setActionBarTitle('Players');
        addActionBarButton('create', <Button
            key="players-list-create"
            variant="filled"
            onClick={() => navigate("/players/new")}>
            Create player
        </Button>);
        return () => {
            setActionBarTitle('');
            removeActionBarButton('create');
        }
    }, [setActionBarTitle, addActionBarButton, removeActionBarButton]);

    return <Table>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Team</Table.Th>
                <Table.Th>Guardian</Table.Th>
                <Table.Th>Guardian phone</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {data.map(player => (
                <Table.Tr key={player.id ?? player.name}>
                    <Table.Td>{player.name}</Table.Td>
                    <Table.Td>{player.team}</Table.Td>
                    <Table.Td>{player.guardian}</Table.Td>
                    <Table.Td>{player.guardianPhone}</Table.Td>
                </Table.Tr>
            ))}
        </Table.Tbody>
    </Table>
}