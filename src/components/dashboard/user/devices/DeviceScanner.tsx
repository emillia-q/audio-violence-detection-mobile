interface DeviceScannerProps {
    onScan: (macAddress: string, deviceSecret: string) => void;
    onSwitchToManual: () => void;
}

