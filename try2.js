class Promises {
    constructor(handler) {
        this.status = 'pending'
        this.onResolved = []
        this.onRejected = []
        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'resolved'
                this.value = value
                this.onResolved.forEach(func => func(value))
            }
        }
        const reject = value => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.value = value
                this.onRejected.forEach(func => func(value))
            }
        }
        try {
            handler(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(resolve, reject) {
        return new Promise((accept, decline) => {
            if (this.status === 'pending') {
                this.onResolved.push((value) => {
                    accept(resolve(value))
                })
                this.onRejected.push((value) => {
                    decline(reject(value))
                })
            } else if (this.status === 'resolved') {
                accept(resolve(this.value))
            } else if (this.status === 'rejected') {
                decline(reject(this.value))
            }
        })
    }
}

//testing 
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('resolved first one'), 1000);
});
p1.then((res) => {
    console.log(res);
    return new Promise(resolve => {
        setTimeout(() => resolve('resolved second one'), 1000);
    });
}).then(res => {
    console.log(res);
});
