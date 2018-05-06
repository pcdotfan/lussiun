export default function ({ store, redirect }) {
    if (!store.state.user.token) {
        return redirect('/login')
    }
}