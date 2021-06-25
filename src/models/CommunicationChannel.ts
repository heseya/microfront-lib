type EventCallback<Payload = any> = (payload: Payload) => void

export class CommunicationChannel {
  name: string
  private listeners: Record<string, EventCallback[]> = {}

  constructor(channelName: string) {
    this.name = channelName
  }

  on<Payload>(event: string, callback: EventCallback<Payload>): void {
    if (!this.listeners[event]) this.listeners[event] = []

    this.listeners[event].push(callback)
  }

  emit(event: string, payload: unknown): void {
    this.listeners[event]?.forEach((callback) => callback(payload))
  }
}
