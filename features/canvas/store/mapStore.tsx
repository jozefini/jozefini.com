import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react'

type MapKey = string
type OnSet<T> = (id: MapKey, data: T) => void
type OnDelete = (id: MapKey) => void
type OnUpdate<T> = (id: MapKey, data: Partial<T>) => void
type OnClear = () => void
type MapActions<T> = {
  onSet?: OnSet<T>
  onDelete?: OnDelete
  onUpdate?: OnUpdate<T>
  onClear?: OnClear
}

export class MapStore<T> {
  private store = new Map<MapKey, T>()
  private subscribers = new Set<() => void>()

  private onSet: OnSet<T>
  private onDelete: OnDelete
  private onUpdate: OnUpdate<T>
  private onClear: OnClear

  private notifySubscribers = () => {
    const subscribersList = Array.from(this.subscribers)
    for (const callback of subscribersList) {
      callback()
    }
  }

  constructor(actions?: MapActions<T>) {
    const {
      onSet = this.voidFn,
      onDelete = this.voidFn,
      onUpdate = this.voidFn,
      onClear = this.voidFn,
    } = actions || {}
    this.onSet = onSet
    this.onDelete = onDelete
    this.onUpdate = onUpdate
    this.onClear = onClear
  }

  voidFn = () => {}

  notify = () => {
    this.notifySubscribers()
  }

  setMapItem = (id: MapKey, data: T, reactive: boolean = true) => {
    this.store.set(id, data)
    this.onSet(id, data)
    if (reactive) {
      this.notifySubscribers()
    }
  }

  deleteMapItem = (id: MapKey, reactive: boolean = true) => {
    this.store.delete(id)
    this.onDelete(id)
    if (reactive) {
      this.notifySubscribers()
    }
  }

  updateMapItem = (id: MapKey, data: Partial<T>, reactive: boolean = true) => {
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

  getMapItem = (id: MapKey) => {
    return this.store.get(id)
  }

  getMapKeys = (filter?: (item: T) => boolean) => {
    if (!filter) {
      return Array.from(this.store.keys())
    }
    let keys: MapKey[] = []
    this.store.forEach((item, key) => {
      if (filter(item)) {
        keys.push(key)
      }
    })
    return keys
  }

  useMapItem = (id: MapKey) => {
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
