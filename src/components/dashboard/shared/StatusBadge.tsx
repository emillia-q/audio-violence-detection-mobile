import {Colors} from "@/src/constants/theme";

type StatusType = 'online' | 'offline' | 'warning';

interface StatusBadgeProps {
    status: StatusType;
    text: string;
}

export default function StatusBadge({status, text}: StatusBadgeProps) {
    // Set color based on status
    const getStatusColor = () => {
        switch (status) {
            case "online":
                return '#10B981';
            case "offline":
                return '#64748B';
            case "warning":
                return '#EF4444';
            default:
                return Colors.default.muted;
        }
    }

    const color = getStatusColor();
}