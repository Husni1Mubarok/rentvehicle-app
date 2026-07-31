require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log('Fetching vehicles...');
  const { data, error } = await supabase.from('vehicles').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Vehicles count:', data ? data.length : 0);
    if (data && data.length > 0) {
      console.log('First vehicle:', data[0].name);
    }
  }
}
test();
