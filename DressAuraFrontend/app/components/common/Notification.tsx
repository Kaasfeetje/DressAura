import { useState, useEffect } from "react";

export enum NotificationType {
    Success = "success",
    Warning = "warning",
    Error = "error",
}

type Props = {
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose?: () => void;
};

export const Notification = ({
    message,
    type = NotificationType.Success,
    duration = 3000,
    onClose,
}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const getNotificationStyle = (): string => {
        switch (type) {
            case NotificationType.Success:
                return "bg-green-500";
            case NotificationType.Warning:
                return "bg-yellow-500";
            case NotificationType.Error:
                return "bg-red-500";
            default:
                return "bg-green-500";
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`${getNotificationStyle()} fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white p-4 rounded-md shadow-lg`}
        >
            <p>{message}</p>
        </div>
    );
};
