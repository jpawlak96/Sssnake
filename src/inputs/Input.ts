export abstract class Input {
  listenerRemovers: any[] = []

  abstract setAnyEventHandler (func: EventListener): void
  abstract setDirectionChangeEventHandler (func: any): void

  clearAllHandlers (): void {
    this.listenerRemovers.forEach(remover => remover())
    this.listenerRemovers = []
  }

  protected addEventListener (type: string, listener: any): void {
    document.addEventListener(type, listener, false)
    this.listenerRemovers.push(() => document.removeEventListener(type, listener))
  }
}
