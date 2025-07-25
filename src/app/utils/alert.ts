// utils/toast.ts
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const baseToastConfig = {
  toast: true,
  position: 'top-end' as const, // top-right
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'swal2-toast',
  },
};

export const showToastSuccess = (message: string) => {
  MySwal.fire({
    ...baseToastConfig,
    icon: 'success',
    title: message,
  });
};

export const showToastError = (message: string) => {
  MySwal.fire({
    ...baseToastConfig,
    icon: 'error',
    title: message,
  });
};

export const showToastWarning = (message: string) => {
  MySwal.fire({
    ...baseToastConfig,
    icon: 'warning',
    title: message,
  });
};

export const showToastInfo = (message: string) => {
  MySwal.fire({
    ...baseToastConfig,
    icon: 'info',
    title: message,
  });
};
