interface Device {
    id: number;
    name: string;
}

interface DeviceListProps {
    devices: Device[];
}

export default function DeviceList({devices}: DeviceListProps) {

}