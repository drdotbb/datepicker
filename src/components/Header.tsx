export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">💕</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              DatePicker
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#calendar" className="text-gray-600 hover:text-pink-600 transition-colors">
              Calendar
            </a>
            <a href="#suggestions" className="text-gray-600 hover:text-pink-600 transition-colors">
              Suggestions
            </a>
            <a href="#about" className="text-gray-600 hover:text-pink-600 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
