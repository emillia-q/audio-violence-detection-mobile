import {ReactNode} from "react";

interface DashboardSectionProps {
    title: string;
    children: ReactNode;
    actionButton?: ReactNode;
}