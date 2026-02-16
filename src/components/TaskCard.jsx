import React from 'react';

function TaskCard({ task, columnId, onDragStart, onDeleteTask }) {
  const priorityColors = {
    high: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-yellow-600',
    low: 'from-green-500 to-green-600',
  };

  const priorityIcons = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getAssigneeColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-amber-500',
      'bg-cyan-500',
    ];
    return colors[name.length % colors.length];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && formatDate(task.dueDate) !== 'Today';

  return (
    // [BUG - SPACING] Border radius is noticeably too small, looks inconsistent. [FIX] Change rounded-none to rounded-lg
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task, columnId)}
      className="bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-none shadow-md border border-slate-500 cursor-grab hover:shadow-lg active:cursor-grabbing transition-all duration-200 hover:from-slate-500 hover:to-slate-600 hover:-translate-y-1 group"
    >
      {/* Title */}
      {/* [BUG - COLOR] Title text is too faded against dark card. [FIX] Change text-slate-500 to text-white */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <p className="text-slate-600 font-semibold text-sm flex-1 line-clamp-2 group-hover:text-blue-200">
          {task.title}
        </p>
        <button
          onClick={() => onDeleteTask(columnId, task.id)}
          className="text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {/* Priority Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{priorityIcons[task.priority]}</span>
        <span className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${priorityColors[task.priority]} text-white font-semibold capitalize`}>
          {task.priority}
        </span>
      </div>

      {/* Footer with assignee and due date */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-500">
        <div
          className={`w-7 h-7 rounded-full ${getAssigneeColor(
            task.assignee
          )} text-white text-xs font-bold flex items-center justify-center shadow-sm`}
          title={task.assignee}
        >
          {getInitials(task.assignee)}
        </div>
        {/* [BUG - SPACING] Date badge has unbalanced padding making layout look awkward. [FIX] Change px-4 py-2 to px-2.5 py-0.5 */}
        <span
          className={`text-xs font-medium ${
            isOverdue
              ? 'text-red-400 bg-red-500/20'
              : 'text-slate-400 bg-slate-600/40'
          } px-4 py-2 rounded-full`}
        >
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
