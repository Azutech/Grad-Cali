export class Semaphore {
    private count: number
    private waitQueue: (() => void)[]

    constructor(initialCount: number) {
        this.count = initialCount
        this.waitQueue = []
    }

    async acquire(): Promise<void> {
        if (this.count > 0) {
            this.count--
        } else {
            await new Promise<void>((resolve) => {
                this.waitQueue.push(resolve)
            })
        }
    }

    release(): void {
        this.count++

        if (this.waitQueue.length > 0) {
            const firstInLine = this.waitQueue.shift()
            firstInLine?.()
        }
    }
}
