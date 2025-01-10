import { createClient } from '@supabase/supabase-js';
import { Database } from '@/supabase/types'; // Update this to the correct path

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || 'https://khrqmmwagoomfgrdhtrh.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocnFtbXdhZ29vbWZncmRodHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NTY3NTEsImV4cCI6MjA0OTMzMjc1MX0.Ykua0HDwXWpY2OaI45_WtGFFOZDAiU-5pGCBFWFRz2Y'
);

export async function fetchNotifications() {
  try {
    const { data, error } = await supabase.from('notifications').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', (error as any).message);
    return [];
  }
}

export async function getUnreadNotificationCount() {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' });
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching unread notification count:', (error as any).message);
    return 0;
  }
}
