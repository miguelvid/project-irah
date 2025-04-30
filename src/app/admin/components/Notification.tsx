import { NotificationType } from '../types/admin';

type NotificationProps = {
  notification: NotificationType;
  onClose: () => void;
};

export const Notification = ({ notification, onClose }: NotificationProps) => (
  <div className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
    notification.type === 'success' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }`}>
    {notification.message}
    <button 
      onClick={onClose} 
      className="ml-2 font-bold"
      aria-label="Fechar notificação"
    >
      ×
    </button>
  </div>
);