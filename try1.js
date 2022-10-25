class Promises {
    constructor(handler) {
        const resolve = params => {
            this.value = params
            this.success = true
        }
        const reject = params => {
            this.value = params
            this.success = false
        }
        try {
            handler(resolve, reject)
        } catch (error) {

        }
    }
    then(resolve) {
        if (this.success) {
            resolve(this.value)
        }
        return this
    }
    catch(reject) {
        if (!this.success) {
            reject(this.value)
        }
    }
}

const promise = new Promises((res, rej) => {
    const pi = 3.14;
    if (pi === 3.14) {
        res('Success')
    } else {
        rej('Fails')
    }
})
promise.then(data => console.log(data))
    .catch(error => console.log(error))
