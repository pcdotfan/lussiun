import * as types from "~/store/types";
export default function ({ store }) {
    if (!store.state.token) {
        store.commit(types.LOGOUT);
        store.$router.push({ name: "login" });
    }
}