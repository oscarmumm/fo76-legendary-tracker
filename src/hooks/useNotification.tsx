import { useState } from 'react';

export const useNotification = () => {
    const [notificationActive, setNotificationActive] =
        useState<boolean>(false);
    const [notificationMsg, setNotificationMsg] = useState<string>('');
    const showNotification = (effect: 'string') => {
        setNotificationMsg(effect)
        setNotificationActive(true);
        setTimeout(() => setNotificationActive(false), 2000);
    };

    return {
        notificationMsg,
        notificationActive,
        showNotification,
    };
};
