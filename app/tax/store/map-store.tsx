import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react'

type OnSet<K, T> = (id: K, data: T) => void
type OnDelete<K> = (id: K) => void
type OnUpdate<K, T> = (id: K, data: Partial<T>) => void
type OnClear = () => void
type MapActions<K, T> = {
  onSet?: OnSet<K, T>
  onDelete?: OnDelete<K>
  onUpdate?: OnUpdate<K, T>
  onClear?: OnClear
  initialStates?: [K, T][]
}

export class MapStore<K, T> {
  private store: Map<K, T>
  private subscribers: Set<() => void>

  private onSet: OnSet<K, T>
  private onDelete: OnDelete<K>
  private onUpdate: OnUpdate<K, T>
  private onClear: OnClear

  private notifySubscribers = () => {
    const subscribersList = Array.from(this.subscribers)
    for (const callback of subscribersList) {
      callback()
    }
  }

  constructor(actions?: MapActions<K, T>) {
    const {
      onSet = this.voidFn,
      onDelete = this.voidFn,
      onUpdate = this.voidFn,
      onClear = this.voidFn,
      initialStates = [],
    } = actions || {}
    this.onSet = onSet
    this.onDelete = onDelete
    this.onUpdate = onUpdate
    this.onClear = onClear
    this.store = new Map<K, T>(initialStates)
    this.subscribers = new Set<() => void>()
  }

  voidFn = () => {}

  notify = () => {
    this.notifySubscribers()
  }

  setMapItem = (id: K, data: T, reactive: boolean = true) => {
    this.store.set(id, data)
    this.onSet(id, data)
    if (reactive) {
      this.notifySubscribers()
    }
  }

  deleteMapItem = (id: K, reactive: boolean = true) => {
    this.store.delete(id)
    this.onDelete(id)
    if (reactive) {
      this.notifySubscribers()
    }
  }

  updateMapItem = (id: K, data: Partial<T>, reactive: boolean = true) => {
    const item = this.store.get(id)
    if (!item) {
      return
    }
    this.store.set(id, { ...item, ...data })
    this.onUpdate(id, data)
    if (reactive) {
      this.notifySubscribers()
    }
  }

  clearMap = (reactive: boolean = true) => {
    this.store.clear()
    this.onClear()
    if (reactive) {
      this.notifySubscribers()
    }
  }

  getMapItem = (id: K) => {
    return this.store.get(id)
  }

  getMapKeys = (filter?: (item: T) => boolean) => {
    if (!filter) {
      return Array.from(this.store.keys())
    }
    let keys: K[] = []
    this.store.forEach((item, key) => {
      if (filter(item)) {
        keys.push(key)
      }
    })
    return keys
  }

  useMapItem = (id: K) => {
    const { initItem, initItemStr } = useMemo(() => {
      const initItem = this.getMapItem(id)
      const initItemStr = JSON.stringify(initItem)
      return { initItem, initItemStr }
    }, [id])
    const itemRef = useRef(initItem)
    const itemStrRef = useRef(initItemStr)

    const getSnapshot = useCallback(() => {
      const newItem = this.getMapItem(id)
      const newValue = JSON.stringify(newItem)

      if (itemStrRef.current !== newValue) {
        itemRef.current = newItem
        itemStrRef.current = newValue
      }
      return itemRef.current
    }, [id])

    const subscribe = useCallback((callback: () => void) => {
      this.subscribers.add(callback)
      return () => {
        this.subscribers.delete(callback)
      }
    }, [])

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  }

  useMapKeys = (filter?: (item: T) => boolean) => {
    const { initKeys, initKeysStr } = useMemo(() => {
      const initKeys = this.getMapKeys(filter)
      const initKeysStr = initKeys.toString()
      return { initKeys, initKeysStr }
    }, [filter])
    const keysRef = useRef(initKeys)
    const keysStrRef = useRef(initKeysStr)

    const getSnapshot = useCallback(() => {
      const newKeys = this.getMapKeys(filter)
      const newValue = newKeys.toString()

      if (keysStrRef.current !== newValue) {
        keysRef.current = newKeys
        keysStrRef.current = newValue
      }
      return keysRef.current
    }, [filter])

    const subscribe = useCallback((callback: () => void) => {
      this.subscribers.add(callback)
      return () => {
        this.subscribers.delete(callback)
      }
    }, [])

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  }
}
