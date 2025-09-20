/**
 * Script to clear invalid Supabase authentication tokens
 * Run this in your browser's developer console to clear stale tokens
 */

function clearSupabaseTokens() {
  console.log('Clearing Supabase authentication tokens...');
  
  // Get all localStorage keys
  const keysToRemove = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
      keysToRemove.push(key);
    }
  }
  
  // Remove identified keys
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`Removed: ${key}`);
  });
  
  // Clear sessionStorage as well
  const sessionKeysToRemove = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
      sessionKeysToRemove.push(key);
    }
  }
  
  sessionKeysToRemove.forEach(key => {
    sessionStorage.removeItem(key);
    console.log(`Removed from session: ${key}`);
  });
  
  console.log(`Cleared ${keysToRemove.length + sessionKeysToRemove.length} authentication tokens`);
  console.log('Please refresh the page or restart the application');
}

// Auto-run the function
clearSupabaseTokens();