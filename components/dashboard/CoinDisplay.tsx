// components/CoinDisplay.tsx
'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth"; // Import the new hook
import { getProfile } from "@/actions/get-profile";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CoinDisplay() {
  const { user, loading } = useAuth(); // Use the new hook
  const [coins, setCoins] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const fetchCoins = async () => {
        const profile = await getProfile(user.id);
        if (profile) {
          setCoins(profile.coins);
        }
      };
      fetchCoins();
    } else {
      setCoins(null); // Clear coins if user logs out
    }
  }, [user]);

  if (loading || !user) {
    return null; 
  }

  // Handle the case where coins might still be loading after user is set
  if (coins === null) {
    return <Badge className="flex items-center gap-1.5 px-3 py-1 animate-pulse">
        <Coins className="h-4 w-4" />
        <span>...</span>
    </Badge>
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 text-sm font-semibold" >
      <Coins className="h-4 w-4" />
      <span>{coins}</span>
    </Badge>
  );
}