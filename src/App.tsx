import { Routes, Route } from 'react-router-dom'
import Index from './routes/index'

// Importe o seu Header para que ele apareça em todas as páginas
import { Header } from './components/tlc/Header'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Adicione outras rotas aqui no futuro, se precisar */}
        </Routes>
      </main>
    </div>
  )
}

export default App
