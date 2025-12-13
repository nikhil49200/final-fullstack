import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data as Task[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'> & { user_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .select()
        .single();

      if (error) throw error;
      setTasks((prev) => [data as Task, ...prev]);
      toast({
        title: 'Task created',
        description: 'Your task has been created successfully.',
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error creating task',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? (data as Task) : task))
      );
      toast({
        title: 'Task updated',
        description: 'Your task has been updated successfully.',
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error updating task',
        description: error.message,
        variant: 'destructive',
      });
      return { data: null, error };
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: 'Task deleted',
        description: 'Your task has been deleted successfully.',
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error deleting task',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
