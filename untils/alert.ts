import { AnyIfEmpty } from "react-redux";
import Swal from "sweetalert2";
const AlertMessage = () => {
  const success = (title:any) => {
    Swal.fire({
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const error = (title:any) => {
    Swal.fire({
      icon: "error",
      title: title,
      //   text: "Something went wrong!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const info = (title:any) => {
    Swal.fire({
      icon: "info",
      title: title,

      showConfirmButton: false,
      timer: 1500,
    });
  };
  const confirm = (callback:any) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };
  return { success, error, info, confirm };
};
export default AlertMessage;