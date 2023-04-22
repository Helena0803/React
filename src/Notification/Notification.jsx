import { notification } from "antd";

export const openNotification = (
  type = "success",
  message = "success",
  description = "success",
  duration = 2
) => {
  return notification[type]({
    message,
    description,
    placement: "bottomRight",
    duration,
  });
};
