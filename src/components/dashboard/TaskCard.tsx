import { motion } from 'framer-motion';
import { Task } from '@/hooks/useTasks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, MoreHorizontal, Pencil, Trash2, CheckCircle2, Clock, Circle } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  index: number;
}

const priorityColors: Record<Task['priority'], string> = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusIcons: Record<Task['status'], React.ElementType> = {
  pending: Circle,
  in_progress: Clock,
  completed: CheckCircle2,
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange, index }: TaskCardProps) {
  const StatusIcon = statusIcons[task.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200
      }}
      layout
      className="group glass rounded-xl p-4 hover:shadow-elegant transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <motion.button
            onClick={() => {
              const nextStatus: Record<Task['status'], Task['status']> = {
                pending: 'in_progress',
                in_progress: 'completed',
                completed: 'pending',
              };
              onStatusChange(task.id, nextStatus[task.status]);
            }}
            className="mt-1 shrink-0"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400 }}
            type="button"
          >
            <StatusIcon
              className={`h-5 w-5 transition-colors ${
                task.status === 'completed'
                  ? 'text-success'
                  : task.status === 'in_progress'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            />
          </motion.button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium truncate ${
                task.status === 'completed' ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>

              {task.due_date && !isNaN(new Date(task.due_date).getTime()) && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                </div>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              type="button"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}