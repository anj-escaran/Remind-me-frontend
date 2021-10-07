import { format } from "date-fns";
export default {
    install(Vue) {
        Vue.filter("truncate", function (string, count) {
            if (string) {
                if (string.length > count) {
                    return string.substring(0, count) + "...";
                } else {
                    return string;
                }
            }
        });

        Vue.filter("userDisplay", function (data) {
            if (data) {
                if (data.user.first_name || data.user.last_name) {
                    return `${data.user.first_name} ${data.user.last_name}`;
                } else {
                    return data.email.split("@")[0];
                }
            }
        });

        Vue.filter("userInitials", function (data) {
            if (data) {
                return `${data.user.first_name.charAt(0)}${data.user.last_name.charAt(
                    0
                )}`;
            }
        });

        Vue.filter("dateformat", function (data) {
            if (data) {
                return `${format(new Date(data), "PP")}`;
            }
        });

        Vue.filter("renewFormat", function (data) {
            if (data) {
                return `${data.spanPriorExpi} ${data.spanCalendarType}`;
            }
        });

        Vue.filter("onOff", function (data) {
            if (data) {
                return "Alarm on";
            } else return "Alarm off"
        });
    },
};
