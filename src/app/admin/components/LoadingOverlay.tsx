type LoadingOverlayProps = {
  isLoading: boolean;
  message?: string;
};

export const LoadingOverlay = ({ isLoading, message = 'Carregando...' }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
      </div>
    </div>
  );
};