import React from 'react';

function App() {
  const columns = [
    { title: 'Backlog', color: 'border-t-4 border-gray-400', items: ['Research competitors', 'Draft user stories'] },
    { title: 'In Progress', color: 'border-t-4 border-blue-500', items: ['Design system setup', 'API integration', 'Unit testing'] },
    { title: 'Review', color: 'border-t-4 border-yellow-500', items: ['Code review', 'QA Testing'] },
    { title: 'Done', color: 'border-t-4 border-green-500', items: ['Project kick-off', 'Repo setup'] },
    { title: 'Archived', color: 'border-t-4 border-purple-500', items: ['Q1 Planning'] },
  ];

  return (
    <div className="flex flex-col h-screen bg-blue-50 font-sans">
      <header className="px-6 py-4 bg-white shadow-sm flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-800">Product Roadmap</h1>
      </header>

      {/* MAIN BOARD: Horizontal scrolling area */}
      {/* FUTURE BUG: Remove 'overflow-x-auto' to break horizontal scrolling */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        
        {/* COLUMNS CONTAINER: Must allow items to maintain width */}
        <div className="flex h-full space-x-6">
          {columns.map((col, idx) => (
            // COLUMN CARD: Fixed width, flexible height
            // FUTURE BUG: Remove 'flex-shrink-0' to see columns squash together
            <div key={idx} className="flex-shrink-0 w-80 bg-gray-100 rounded-xl shadow-sm flex flex-col max-h-full">
              
              {/* Column Header */}
              <div className={`p-4 bg-white rounded-t-xl shadow-sm ${col.color} flex justify-between items-center`}>
                <h3 className="font-bold text-gray-700">{col.title}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{col.items.length}</span>
              </div>

              {/* Draggable Items Area */}
              <div className="p-3 overflow-y-auto space-y-3 flex-1">
                {col.items.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition">
                    <p className="text-sm text-gray-800 font-medium">{item}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">JM</div>
                      <span className="text-xs text-gray-400">#32{i}</span>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 text-gray-500 hover:bg-gray-200 rounded-lg text-sm transition">
                  + Add Card
                </button>
              </div>

            </div>
          ))}
          
          {/* Spacer to ensure last column has margin */}
          <div className="w-2 flex-shrink-0"></div>
        </div>
      </main>
    </div>
  );
}

export default App;