import PropTypes from 'prop-types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const DataContext = createContext({})

export const api = {
  loadData: async () => {
    const json = await fetch('/events.json')
    return json.json()
  },
}

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  // Créer un nouveau tableau ordonné eventsByDateDesc à partir de data.events dans lequel les événements sont triés par date du plus récent au plus ancien.
  const eventsByDateDesc =
    data && data.events
      ? [...data.events].sort((evtA, evtB) =>
          new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
        )
      : []

  // Définir "last" pour récupérer les données de l'événement le plus récent (le premier dans le tableau ordonné eventsByDateDesc). Si le tableau est vide, la valeur de last est "null". Ceci corrige le bug d'affichage de la card dans le Footer en affichant bien la dernière prestation (c'est à dire la plus récente, et non la dernière entrée du tableau de données).
  const last = eventsByDateDesc.length > 0 ? eventsByDateDesc[0] : null

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData())
    } catch (err) {
      setError(err)
    }
  }, [])

  useEffect(() => {
    if (data) return
    getData()
  })

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext)

export default DataContext