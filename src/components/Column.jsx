import React from 'react';
import TaskCard from './TaskCard';

function Column({
  column,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
  onDeleteTask,
  newTaskInput,
  setNewTaskInput,
}) {
  return (
    // [BUG - LAYERS] Opacity makes the column look disabled/broken. [FIX] Remove opacity-50 class
    <div className="flex-shrink-0 w-96 flex flex-col bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-600 opacity-50">
      {/* Column Header */}
      {/* [BUG - COLOR] Header text is noticeably too dark. [FIX] Change text-gray-800 to text-white */}
      <div className={`bg-gradient-to-r ${column.color} px-6 py-4 flex items-center justify-between text-gray-800`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{column.icon}</span>
          <div>
            <h2 className="text-white font-bold text-lg">{column.title}</h2>
            <p className="text-white/70 text-xs">{tasks.length} tasks</p>
          </div>
        </div>
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {tasks.length}
        </span>
      </div>

      {/* Tasks Container */}
      {/* [BUG - SPACING] Interior padding is noticeably unbalanced. [FIX] Change p-8 to p-4 */}
      <div
        className="flex-1 overflow-y-auto p-8 space-y-3 custom-scrollbar"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.id)}
      >
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <p className="text-center text-sm">
              <span className="block text-2xl mb-2">✨</span>
              No tasks yet. Add one to get started!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              onDragStart={onDragStart}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>

      {/* Add Task Section */}
      <div className="border-t border-slate-600 p-4 bg-slate-800/50">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskInput[column.id] || ''}
            onChange={(e) =>
              setNewTaskInput((prev) => ({
                ...prev,
                [column.id]: e.target.value,
              }))
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onAddTask(column.id);
              }
            }}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600"
          />
          {/* [BUG - COLOR] Button text is dark blue on dark blue background. [FIX] Change text-blue-800 to text-white */}
          <button
            onClick={() => onAddTask(column.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-blue-800 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold text-sm transition-all duration-200 transform hover:scale-105"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Column;
