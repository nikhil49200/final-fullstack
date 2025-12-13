import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useTasks, Task } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/dashboard/TaskCard';
import TaskDialog from '@/components/dashboard/TaskDialog';
import TaskFilters from '@/components/dashboard/TaskFilters';
import UserProfile from '@/components/dashboard/UserProfile';
import { Plus, LogOut, LayoutDashboard, Loader2, ListTodo } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    };
  }, [tasks]);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    status: Task['status'];
    priority: Task['priority'];
    due_date: string | null;
  }) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask({
        ...data,
        user_id: user!.id,
      });
    }
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    await updateTask(id, { status });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden sm:block">TaskFlow</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <UserProfile />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total', value: taskStats.total, color: 'text-foreground' },
                  { label: 'Pending', value: taskStats.pending, color: 'text-muted-foreground' },
                  { label: 'In Progress', value: taskStats.inProgress, color: 'text-primary' },
                  { label: 'Completed', value: taskStats.completed, color: 'text-success' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-accent/50">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl font-bold">Tasks</h1>
                <p className="text-muted-foreground">Manage your tasks efficiently</p>
              </div>
              <Button
                onClick={() => {
                  setEditingTask(null);
                  setDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TaskFilters
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
              />
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {tasks.length === 0
                    ? 'Create your first task to get started'
                    : 'Try adjusting your filters'}
                </p>
                {tasks.length === 0 && (
                  <Button
                    onClick={() => {
                      setEditingTask(null);
                      setDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </motion.div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      onEdit={handleEdit}
                      onDelete={deleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
