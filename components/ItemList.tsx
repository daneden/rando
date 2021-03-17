import { ChangeEvent, useCallback, useEffect, useState } from "react"
import useURLState from "../utils/useURLState"

export default function ItemList() {
  const [, updateState] = useState(null)
  const forceUpdate = useCallback(() => updateState({}), [])

  const [items, setItems] = useURLState<string[]>([], "items")
  const [itemIndex, setItemIndex] = useState<number>(null)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {}, [items])

  function updateSelection() {
    const newCandidate = () => Math.floor(Math.random() * items.length)
    let candidate = newCandidate()
    while (candidate === itemIndex && items.length >= 2) {
      candidate = newCandidate()
    }

    setItemIndex(candidate)

    document
      .querySelector(`#item-${items[candidate]}`)
      .scrollIntoView({ behavior: "smooth", block: "center" })
  }

  function updateItems() {
    const currentItems = items as string[]
    const newItems = inputValue.split(/, ?/)

    const combined = Array.from(new Set(currentItems.concat(newItems)))
    setItems(combined)

    setInputValue("")
  }

  function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value

    if (value != "") {
      setInputValue(e.currentTarget.value)
    }
  }

  function removeAtIndex(index: number) {
    let oldItems = items
    oldItems.splice(index, 1)
    setItems(oldItems)
    forceUpdate()
    setItemIndex(null)
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input
            value={inputValue}
            onChange={updateInputValue}
            placeholder="Enter an item or comma-separated items"
          />
          <button disabled={inputValue.length === 0} onClick={updateItems}>
            Add item(s)
          </button>
        </form>
        {items.length == 0 ? (
          <p className="placeholder">☝️ Enter items above ☝️</p>
        ) : (
          <>
            <ul>
              {items.map((item: string, index: number) => (
                <li
                  className={index == itemIndex ? "selected" : ""}
                  key={item}
                  id={`item-${item}`}
                >
                  {item}

                  <button onClick={() => removeAtIndex(index)}>&times;</button>
                </li>
              ))}
            </ul>
            <button onClick={updateSelection}>🎲 Pick a random item</button>
          </>
        )}
      </div>
      <style jsx>{`
        .placeholder {
          text-align: center;
          padding: 2em;
          background-color: rgba(128, 128, 128, 0.05);
          border-radius: 0.25em;
        }

        .selected {
          color: royalblue;
          background-color: rgba(65, 105, 225, 0.1);
        }

        ul {
          padding: 0;
          list-style: none;
        }

        li {
          color: inherit;
          padding: 0.5em;
          border-radius: 0.25em;
          transition: 0.2s cubic-bezier(0.5, 0.18, 0.14, 0.96);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        li + li {
          border-top: 1px solid rgba(128, 128, 128, 0.1);
        }

        form {
          display: grid;
          gap: 1em;
          grid-template-columns: 1fr max-content;
        }

        li button {
          padding-bottom: 0.3em;
          line-height: 1;
          opacity: 0.5;
          transition: 0.2s ease;
        }

        li:hover button {
          opacity: 1;
          color: red;
          background-color: rgba(255, 50, 50, 0.1);
        }
      `}</style>
    </>
  )
}
