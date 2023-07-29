import Store from '../../store'

function checkAuth(f: AnyFun) {
    return function() {
        if (Store.getState().auth) {
            return f.apply(this, arguments)
        }
    }
}

export default checkAuth
