import { toast } from "sonner";
import { isReduxRtqError } from "../redux/api/baseApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rtqErrorMessageHandle = (error: any) => {
   if (isReduxRtqError(error)) {
      toast.error(error.data.message);
   } else {
      toast.error("Something went wrong, try again!");
   }
};

export default rtqErrorMessageHandle;
