// import { NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

// export async function GET() {
//   const supabase = createClient()

//   const { data, error } = await supabase.from('users').select('*')

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json(data)
// }
