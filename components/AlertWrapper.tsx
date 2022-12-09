import { useAlert } from '../context/hooks/useAlert';

import Alert from './Alert';

const AlertWrapper = () => {
  const { alerts } = useAlert();

  if (alerts.length !== 0)
    return (
      <div className="     fixed flex flex-col items-end gap-2 justify-center right-0 bottom-5 z-[300]">
        {alerts.map((alert) => {
          return (
            <Alert
              id={alert.id}
              message={alert.message}
              isSuccess={alert.isSuccess}
              key={alert.id}
            />
          );
        })}
      </div>
    );
};

export default AlertWrapper;
