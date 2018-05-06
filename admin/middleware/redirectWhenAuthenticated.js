export default function({ store }) {
  if (!store.state.token && store.state.route.name === "login") {
    store.$router.push({ name: "backend-dashboard" });
  }
}
