import { createClient } from '@/supabase/server';
import { QueryData } from '@supabase/supabase-js';

const supabasePromise = createClient();

async function getOrdersWithProductsQuery() {
  const supabase = await supabasePromise;

  return supabase
    .from('order')
    .select('*, order_items:order_item(*, product(*)), user(*)')
    .order('created_at', { ascending: false });
}

const ordersWithProductsQuery = getOrdersWithProductsQuery();

export type OrdersWithProducts = QueryData<typeof ordersWithProductsQuery>;