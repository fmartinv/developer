import { useState } from 'react'

import './App.css'
/**
 * Crear un menu vertical. Cada Item principal puede contener SubItems
 * Si tiene SubItems, aparecerá un botón de  toggle junto al item principal
 * Al hacer click en el botón, mostrará u ocultará los subItems.
 * Si los subItems están colapsados, el label del botón será "Expand"
 * Si los subItems están visibles, el label del botón será "Hide"
 *
 * Importante: SOLO DEBE HABER UN SUBMENU EXPANDIDO A LA VEZ
 *
 * Notas:
 * El Menú completo debe estar contenido en un DIV,
 * quien estará asociado a una clase de CSS "menu-wrapper"
 *
 * Cada item y subItem deben tener un atributo 'data-test-id' que contenga
 * el nivel de profundidad del elemento y el titulo.
 * todo el valor del atributo debe ser en minúsculas.
 *
 * Ejemplo id Item -> "first-level-home"
 * Ejemplo id SubItem -> "second-level-cooking"
 *
 */

// MOCK DATA
const MENU_MOCK = [
  {
    title: 'Home'
  },
  {
    title: 'Services',
    subItems: ['Cooking', 'Cleaning', 'Washing']
  },
  {
    title: 'Contact',
    subItems: ['Phone', 'Mail']
  },
  {
    title: 'Wsubmenu',
    subItems: []
  }
]

function Item(props) {
  const { item, index, selectedIndex, setSelectedIndex } = props
  const isSelected = index === selectedIndex
  // console.log(
  //   'index',
  //   index,
  //   'selectedIndex',
  //   selectedIndex,
  //   'isSelected',
  //   isSelected
  // )

  const toggleExpand = () => {
    setSelectedIndex(isSelected ? null : index)
  }

  return (
    <div
      className='menu-item'
      data-test-id={`first-level-${item.title.toLowerCase()}`}
    >
      {item.title}
      {item.subItems && item.subItems.length > 0 && (
        <button onClick={toggleExpand}>{isSelected ? 'Hide' : 'Expand'}</button>
      )}
      {isSelected && (
        <ul className='sub-menu'>
          {item.subItems &&
            item.subItems.map((subItem, index) => (
              <li
                key={index}
                data-test-id={`second-level-${subItem.toLowerCase()}`}
              >
                {subItem}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

function Solution(props) {
  const [selectedIndex, setSelectedIndex] = useState('')
  const { menuConfig } = props

  return (
    <div className='menu-wrapper'>
      {menuConfig.map(item => (
        <Item
          key={item.title}
          item={item}
          index={item.title}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
    </div>
  )
}

function App() {
  return <Solution menuConfig={MENU_MOCK} />
}

export default App
