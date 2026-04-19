import { useState, useCallback, useRef, useEffect } from 'react'
import { categories, items, getRandomItem, getRandomOutfit } from './data/items'
import './App.css'

function SlotItem({ category, item, isSpinning, onSwap }) {
  const [displayItem, setDisplayItem] = useState(item)
  const intervalRef = useRef(null)
  const finalItemRef = useRef(item)

  useEffect(() => {
    finalItemRef.current = item
  }, [item])

  useEffect(() => {
    if (isSpinning) {
      const pool = items[category.key]
      let i = 0
      intervalRef.current = setInterval(() => {
        setDisplayItem(pool[i % pool.length])
        i++
      }, 80)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setDisplayItem(finalItemRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isSpinning, category.key])

  useEffect(() => {
    if (!isSpinning) setDisplayItem(item)
  }, [item, isSpinning])

  return (
    <div className={`slot-item ${isSpinning ? 'spinning' : 'landed'}`}>
      <div className="slot-label">{category.label}</div>
      <div className="slot-image-wrap" onClick={onSwap}>
        <img
          src={displayItem.image}
          alt={displayItem.name}
          className="slot-image"
          draggable={false}
        />
      </div>
      <div className="slot-name">{isSpinning ? '\u00A0' : displayItem.name}</div>
      <button className="swap-btn" onClick={onSwap} disabled={isSpinning}>
        &#x21bb; swap
      </button>
    </div>
  )
}

function EmptySlot({ category }) {
  return (
    <div className="slot-item slot-empty">
      <div className="slot-label">{category.label}</div>
      <div className="slot-image-wrap">
        <span className="empty-label">coming soon</span>
      </div>
      <div className="slot-name">&nbsp;</div>
      <div className="swap-btn" style={{ visibility: 'hidden' }}>swap</div>
    </div>
  )
}

export default function App() {
  const [outfit, setOutfit] = useState(getRandomOutfit)
  const [spinningSlots, setSpinningSlots] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const timeoutsRef = useRef([])

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const activeCategories = categories.filter(c => items[c.key].length > 0)

  const generate = useCallback(() => {
    if (isGenerating) return
    clearTimeouts()
    setIsGenerating(true)

    const newOutfit = getRandomOutfit()
    const allKeys = activeCategories.map(c => c.key)

    const spinning = {}
    allKeys.forEach(k => spinning[k] = true)
    setSpinningSlots(spinning)

    allKeys.forEach((key, i) => {
      const delay = 500 + i * 300
      const t = setTimeout(() => {
        setOutfit(prev => ({ ...prev, [key]: newOutfit[key] }))
        setSpinningSlots(prev => ({ ...prev, [key]: false }))
        if (i === allKeys.length - 1) {
          setIsGenerating(false)
        }
      }, delay)
      timeoutsRef.current.push(t)
    })
  }, [isGenerating, clearTimeouts, activeCategories])

  const swap = useCallback((categoryKey) => {
    if (isGenerating) return
    const current = outfit[categoryKey]
    const newItem = getRandomItem(categoryKey, current)

    setSpinningSlots(prev => ({ ...prev, [categoryKey]: true }))

    const t = setTimeout(() => {
      setOutfit(prev => ({ ...prev, [categoryKey]: newItem }))
      setSpinningSlots(prev => ({ ...prev, [categoryKey]: false }))
    }, 400)
    timeoutsRef.current.push(t)
  }, [outfit, isGenerating])

  return (
    <div className="app">
      <header className="header">
        <h1>Slay Shuffle NYC</h1>
        <p className="subtitle">tap generate. get dressed. go.</p>
      </header>

      <button
        className={`generate-btn ${isGenerating ? 'generating' : ''}`}
        onClick={generate}
        disabled={isGenerating}
      >
        {isGenerating ? 'picking...' : 'generate outfit'}
      </button>

      <div className="outfit-grid">
        {categories.map(cat => {
          const hasItems = items[cat.key].length > 0
          if (!hasItems) return <EmptySlot key={cat.key} category={cat} />
          return (
            <SlotItem
              key={cat.key}
              category={cat}
              item={outfit[cat.key]}
              isSpinning={!!spinningSlots[cat.key]}
              onSwap={() => swap(cat.key)}
            />
          )
        })}
      </div>
    </div>
  )
}
